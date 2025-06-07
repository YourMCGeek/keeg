"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { checkValidToken } from "@/lib/api/builtbybit";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { getApiKey, setApiKey } from "@/lib/actions/settings-actions";

const formSchema = z.object({
  apiKey: z.string().min(32, {
    message: "API Key must be at least 32 characters.",
  }),
});

/**
 * A component for managing BuiltByBit API key settings.
 * It allows users to view, save, and validate their API key,
 * which is stored in a secure, httpOnly cookie.
 */
export function BuiltByBitSettings() {
  const { data: session } = useSession();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  useEffect(() => {
    async function loadApiKey() {
      // Since the cookie is httpOnly, we can't read it directly.
      // Instead, we use a server action that has access to the cookies.
      const key = await getApiKey();
      if (key) {
        form.setValue("apiKey", key, {
          shouldDirty: false,
          shouldTouch: false,
        });
      }
    }
    loadApiKey();
  }, [form]);

  const handleSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      if (!session) {
        toast.error("Session not found. Please log in again.");
        return;
      }

      setIsLoading(true);
      try {
        const isKeyValid = await checkValidToken(values.apiKey);
        if (!isKeyValid.valid) {
          toast.error(
            `${isKeyValid.error} Please check your key and try again.`
          );
          return;
        }

        await setApiKey(values.apiKey);
        toast.success("API key saved successfully.");
        form.reset({ apiKey: values.apiKey });
      } catch (error) {
        console.error("Error saving API key:", error);
        toast.error("An error occurred while saving the API key.");
      } finally {
        setIsLoading(false);
      }
    },
    [session, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>BuiltByBit Settings</CardTitle>
            <CardDescription>
              Your Private API Key is required to interact with the BuiltByBit
              API. Your private key can be found{" "}
              <Link
                href="https://builtbybit.com/account/api"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                here
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        {...field}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={"Private API Key"}
                        className="flex-grow"
                        autoComplete="off"
                        data-1p-ignore="true"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPasswordVisible(!isPasswordVisible);
                        }}
                        disabled={isLoading}
                        className=""
                      >
                        {isPasswordVisible ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="italic">
                    This setting is stored locally in your browser, not on the
                    server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isDirty || isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
