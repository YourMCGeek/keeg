import BuiltByBitSettings from "@/components/dashboard/settings/BuiltByBitSettings";
import ResourceCheckingSettings from "@/components/dashboard/settings/ResourceCheckingSettings";
import VideoDownloaderSettings from "@/components/dashboard/settings/VideoDownloaderSettings";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BuiltByBitSettings />
        <ResourceCheckingSettings />
        <VideoDownloaderSettings />
        {/* Add more components as needed */}
      </div>
    </div>
  );
}
