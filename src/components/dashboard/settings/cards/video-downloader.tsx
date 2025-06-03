import SettingsCard from "../settings-card";
import { FlexibleInput } from "../flexible-input";
import type { SettingsCardProps, InputConfig } from "../types";

const VIDEO_DOWNLOADER_INPUTS: InputConfig[] = [
  {
    key: "firstName",
    title: "First Name",
    description: "First name for video downloader settings.",
    placeholder: "Enter your downloader first name",
    type: "text",
  },
  {
    key: "lastName",
    title: "Last Name",
    description: "Last name for video downloader settings.",
    placeholder: "Enter your downloader last name",
    type: "text",
  },
  {
    key: "language",
    title: "Preferred Video Languages",
    description: "Select which video languages you want to download.",
    type: "checkbox",
    options: [
      { label: "English", value: "en" },
      { label: "Spanish", value: "es" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Japanese", value: "ja" },
    ],
  },
];

export default function VideoDownloaderCard({
  formState,
  updateField,
  sectionRefs,
}: SettingsCardProps) {
  return (
    <SettingsCard
      id="video-downloader"
      title="Video Downloader"
      innerRef={(el) => (sectionRefs.current["video-downloader"] = el)}
    >
      {VIDEO_DOWNLOADER_INPUTS.map((inputConfig) => {
        const { key, ...restConfig } = inputConfig;
        return (
          <FlexibleInput
            key={key}
            {...restConfig}
            value={formState.videoDownloader[key] || ""}
            onChange={(val) => updateField("videoDownloader", null, key, val)}
          />
        );
      })}
    </SettingsCard>
  );
}
