namespace AutoAdd {
  export const setAutoAddEnabled = (value: boolean): void => {
    localStorage.setItem(RUN_NOW_STORAGE_KEY, String(Boolean(value)));
  };
}
