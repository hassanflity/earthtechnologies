const pagesizeStore = (set?: any) => ({
  // theme state
  pagesize: false,
  setsizePage: (value: boolean) => set((state: any) => ({ pagesize: value })),
});

export default pagesizeStore;
