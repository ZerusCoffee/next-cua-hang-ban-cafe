export interface Option {
  id: number;
  productOptionId: number;
  value: string;
  additionalPrice: number;
  default: boolean;
}

export interface OptionGroup {
  groupId: number;
  groupName: string;
  type: "single" | "multiple";
  min: number;
  max: number;
  isRequired: boolean;
  options: Option[];
}
