export type SectionInputKey =
  | "firstName"
  | "lastName"
  | "theme"
  | "notifications"
  | "language";

export type SectionData = {
  firstName: string;
  lastName: string;
  theme?: string;
  notifications?: string;
  language?: string;
};

export type ResourceCheckingData = {
  minecraft: SectionData;
  roblox: SectionData;
};

export type FormState = {
  builtbybit: SectionData;
  videoDownloader: SectionData;
  resourceChecking: ResourceCheckingData;
};

export type InputType = "text" | "radio" | "select" | "checkbox" | "textarea";

export interface InputOption {
  label: string;
  value: string;
}

export interface InputConfig {
  key: SectionInputKey;
  title: string;
  description: string;
  placeholder?: string;
  type: InputType;
  options?: InputOption[]; // For radio, select, checkbox
  rows?: number; // For textarea
}

export interface SettingsCardProps {
  formState: FormState;
  updateField: (
    section: keyof FormState,
    subSection: keyof ResourceCheckingData | null,
    key: SectionInputKey,
    value: string
  ) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}
