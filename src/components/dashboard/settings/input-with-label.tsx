import { Input } from "@/components/ui/input";

export function InputWithLabel({
  title,
  description,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-sm mb-1">{title}</label>
      <p className="text-xs text-muted-foreground mb-1">{description}</p>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
