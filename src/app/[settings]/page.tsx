import Settings from "@/components/dashboard/settings/settings";
import { SidebarInset } from "@/components/ui/sidebar";

export default function SettingsPage() {
  return (
    <SidebarInset>
      <div className="flex-1 overflow-auto w-full p-4">
        <Settings />
      </div>
    </SidebarInset>
  );
}
