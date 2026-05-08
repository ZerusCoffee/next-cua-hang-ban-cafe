import { ProductSuggestions } from "@/services/search.service";
import type { ProductSuggestion } from "@/types/search.type";
import type { DebouncedFunc } from "lodash";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useProductSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedFn = useRef<DebouncedFunc<
    (term: string) => Promise<void>
  > | null>(null);

  useEffect(() => {
    debouncedFn.current = debounce(async (term: string) => {
      if (term.length < 2) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await ProductSuggestions(term);
        console.log("Data: ", data);
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      debouncedFn.current?.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedFn.current?.(query);
  }, [query]);

  return { suggestions, loading };
}
