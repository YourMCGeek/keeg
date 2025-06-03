import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { InputConfig } from "./types";

interface FlexibleInputProps extends InputConfig {
  value: string;
  onChange: (val: string) => void;
}

export function FlexibleInput({
  title,
  description,
  placeholder,
  value,
  onChange,
  type,
  options = [],
  rows = 3,
}: FlexibleInputProps) {
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="space-y-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />

                <Label
                  htmlFor={option.value}
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <Checkbox
                  id={option.value}
                  checked={value.split(",").includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = value ? value.split(",") : [];
                    if (checked) {
                      onChange([...currentValues, option.value].join(","));
                    } else {
                      onChange(
                        currentValues
                          .filter((v) => v !== option.value)
                          .join(","),
                      );
                    }
                  }}
                />

                <Label
                  htmlFor={option.value}
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full resize-y"
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium leading-none">{title}</label>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div>{renderInput()}</div>
    </div>
  );
}
