"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  getVideoQuality,
  setVideoQuality,
} from "@/lib/actions/settings-actions";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  quality: z
    .string()
    .min(1, "Quality preference is required.")
    .max(20, "Quality preference must be 20 characters or less."),
});

/**
 * A component for managing video downloader settings.
 * It allows users to set a preferred video quality, which is saved to a cookie.
 */
export function VideoDownloaderSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: "",
    },
  });

  useEffect(() => {
    async function loadInitialQuality() {
      const quality = await getVideoQuality();
      if (quality) {
        form.setValue("quality", quality, {
          shouldDirty: false,
          shouldTouch: false,
        });
      }
    }
    loadInitialQuality();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await setVideoQuality(values.quality);
      toast.success("Video quality preference saved.");
      form.reset({ quality: values.quality });
    } catch (error) {
      console.error("Error saving video quality:", error);
      toast.error("Failed to save video quality preference.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Video Downloader</CardTitle>
            <CardDescription>
              Set your preferred quality for video downloads.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    type="text"
                    placeholder="e.g., 1080p, 720p, best"
                    disabled={isLoading}
                  />
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
              {isLoading ? "Saving..." : "Save Preference"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
