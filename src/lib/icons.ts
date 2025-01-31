import * as LucideIcons from "lucide-react";

// Define valid icon names
export type IconName = keyof typeof LucideIcons;

// Type-safe icon mapping function
export function getIcon(name: IconName) {
  return LucideIcons[name];
}

// Optional: Create a validation function
export function isValidIconName(name: string): name is IconName {
  return name in LucideIcons;
}
