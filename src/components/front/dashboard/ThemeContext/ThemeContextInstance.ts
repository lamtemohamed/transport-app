import { createContext } from "react";
import type { ThemeContextType } from "./theme.type";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
