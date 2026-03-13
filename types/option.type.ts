export interface Option {
    id: number,
    productOptionId: number,
    value: string,
    additionalPrice: number
}

export interface OptionGroup {
    groupId: number,
    groupName: string,
    type: "single" | "multiple",
    min: number
    max: number,
    isRequired: boolean,
    options: Option[]
}