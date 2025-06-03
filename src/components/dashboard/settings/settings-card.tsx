import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export default function SettingsCard({
  id,
  title,
  children,
  innerRef,
}: {
  id: string;
  title: string;
  children: ReactNode;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <Card
      ref={innerRef}
      id={id}
      className="scroll-mt-24 border-border/40 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
