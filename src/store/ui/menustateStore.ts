const menustateStore = (set?: any) => ({
  // theme state
  menuState: false,
  toggleMenuState: (value: boolean) =>
    set((state: any) => ({ menuState: value })),
});

export default menustateStore;
