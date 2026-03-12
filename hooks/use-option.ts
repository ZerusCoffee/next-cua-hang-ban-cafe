import { productService } from "@/services/product-service";
import { Option, OptionGroup } from "@/types/option.type";
import useSWR from "swr";


export function useGetOptions(slug: string) {
    const { data, error, isLoading, mutate } = useSWR(
        `options-${slug}`,
        () => productService.getOptionsBySlug(slug!)
    );

    return {
        data,
        isLoading,
        isError: error,
        mutate,
    };
}


export type OptionState = {
  [groupId: number]: Option | Option[]
}

export type OptionAction =
  | {
      type: "SELECT_OPTION"
      groupId: number
      option: Option
      selectionType: "single" | "multiple"
      max: number
    }
  | {
      type: "INIT"
      payload: OptionState
    }

export function buildInitialState(optionGroups: OptionGroup[]): OptionState {
  const state: OptionState = {}

  optionGroups.forEach(group => {
    if (group.type === "single" && group.isRequired) {
      state[group.groupId] = group.options[0]
    }
  })

  return state
}

export function optionReducer(
  state: OptionState,
  action: OptionAction
): OptionState {

  switch (action.type) {

    case "INIT":
      return action.payload

    case "SELECT_OPTION":

      const { groupId, option, selectionType, max } = action

      if (selectionType === "single") {
        return {
          ...state,
          [groupId]: option
        }
      }

      const currentOptions = Array.isArray(state[groupId])
        ? state[groupId] as Option[]
        : []

      if (currentOptions.includes(option)) {
        return {
          ...state,
          [groupId]: currentOptions.filter(id => id !== option)
        }
      }

      else {
        if(currentOptions.length === max) {
          return state;
        }
        return {
          ...state,
          [groupId]: [...currentOptions, option]
        }
      }

    default:
      return state
  }
}