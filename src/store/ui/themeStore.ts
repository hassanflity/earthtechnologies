const themeStore = (set?: any) => ({
  // theme state
  dark: false,
  toggleDarkMode: (value: boolean) => set((state: any) => ({ dark: value })),
});

export default themeStore;
