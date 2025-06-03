import SettingsCard from "../settings-card";
import { InputWithLabel } from "../input-with-label";
import type { SettingsCardProps, ResourceCheckingData } from "../types";

const RESOURCE_CHECKING_SUBSECTIONS = [
  {
    id: "minecraft" as keyof ResourceCheckingData,
    title: "Minecraft",
    inputs: [
      {
        key: "firstName" as const,
        title: "First Name",
        description: "Minecraft resource checker first name.",
        placeholder: "Enter Minecraft first name",
      },
      {
        key: "lastName" as const,
        title: "Last Name",
        description: "Minecraft resource checker last name.",
        placeholder: "Enter Minecraft last name",
      },
    ],
  },
  {
    id: "roblox" as keyof ResourceCheckingData,
    title: "Roblox",
    inputs: [
      {
        key: "firstName" as const,
        title: "First Name",
        description: "Roblox resource checker first name.",
        placeholder: "Enter Roblox first name",
      },
      {
        key: "lastName" as const,
        title: "Last Name",
        description: "Roblox resource checker last name.",
        placeholder: "Enter Roblox last name",
      },
    ],
  },
];

export default function ResourceCheckingCard({
  formState,
  updateField,
  sectionRefs,
}: SettingsCardProps) {
  return (
    <SettingsCard
      id="resource-checking"
      title="Resource Checking"
      innerRef={(el) => (sectionRefs.current["resource-checking"] = el)}
    >
      {RESOURCE_CHECKING_SUBSECTIONS.map(({ id, title, inputs }) => (
        <div key={id} className="mb-6 border rounded-md p-4">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          {inputs.map(({ key, title, description, placeholder }) => (
            <InputWithLabel
              key={key}
              title={title}
              description={description}
              placeholder={placeholder}
              value={formState.resourceChecking[id][key]}
              onChange={(val) => updateField("resourceChecking", id, key, val)}
            />
          ))}
        </div>
      ))}
    </SettingsCard>
  );
}
