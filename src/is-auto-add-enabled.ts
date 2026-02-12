namespace AutoAdd {
  export const isAutoAddEnabled = (): boolean =>
    localStorage.getItem(RUN_NOW_STORAGE_KEY) === "true";
}
