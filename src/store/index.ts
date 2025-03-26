import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import themeStore from "./ui/themeStore";
import fullpage from "./ui/fullpage";
import menustateStore from "./ui/menustateStore";

// persist will save and retrieve the values from/into the localStorage
const cachethemeStore = persist(themeStore, { name: "user_settings" });
export const useThemeStore = create(devtools(cachethemeStore));
export const usefullpage = create(devtools(fullpage));
export const usemenustateStore = create(devtools(menustateStore));
