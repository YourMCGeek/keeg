import { BuiltByBitSettings } from "@/components/dashboard/settings/builtbybit-settings";
import ResourceCheckingSettings from "@/components/dashboard/settings/ResourceCheckingSettings";
import { VideoDownloaderSettings } from "@/components/dashboard/settings/VideoDownloaderSettings";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/settings")}`);
  }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <BuiltByBitSettings />
        <ResourceCheckingSettings />
        <VideoDownloaderSettings />
        {/* Add more components as needed */}
      </div>
    </div>
  );
}
