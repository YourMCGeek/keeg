import SettingsCard from "../settings-card";
import { FlexibleInput } from "../flexible-input";
import type { SettingsCardProps, InputConfig } from "../types";

const BUILTBYBIT_INPUTS: InputConfig[] = [
  {
    key: "firstName",
    title: "First Name",
    description: "Your BuiltByBit first name.",
    placeholder: "Enter your BuiltByBit first name",
    type: "text",
  },
  {
    key: "lastName",
    title: "Last Name",
    description: "Your BuiltByBit last name.",
    placeholder: "Enter your BuiltByBit last name",
    type: "text",
  },
  {
    key: "theme",
    title: "Theme Preference",
    description: "Choose your preferred theme for the BuiltByBit interface.",
    type: "radio",
    options: [
      { label: "Light Theme", value: "light" },
      { label: "Dark Theme", value: "dark" },
      { label: "System Default", value: "system" },
    ],
  },
  {
    key: "notifications",
    title: "Notification Settings",
    description: "Select how you want to receive notifications.",
    placeholder: "Choose notification preference",
    type: "select",
    options: [
      { label: "All Notifications", value: "all" },
      { label: "Important Only", value: "important" },
      { label: "None", value: "none" },
    ],
  },
];

export default function BuiltByBitCard({
  formState,
  updateField,
  sectionRefs,
}: SettingsCardProps) {
  return (
    <SettingsCard
      id="builtbybit"
      title="BuiltByBit"
      innerRef={(el) => (sectionRefs.current["builtbybit"] = el)}
    >
      {BUILTBYBIT_INPUTS.map((inputConfig) => {
        const { key, ...restConfig } = inputConfig;
        return (
          <FlexibleInput
            key={key}
            {...restConfig}
            value={formState.builtbybit[key] || ""}
            onChange={(val) => updateField("builtbybit", null, key, val)}
          />
        );
      })}
    </SettingsCard>
  );
}
