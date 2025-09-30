import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === "undefined") return initialValue;
      return JSON.parse(item);
    } catch (error) {
      console.error("useLocalStorage get error:", error);
      return initialValue;
    }
  });

  const setStoredValue = (val: T) => {
    try {
      setValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error("useLocalStorage set error:", error);
    }
  };

  return [value, setStoredValue] as const;
}
