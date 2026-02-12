namespace AutoAdd {
  export const getNextPageControl = (): HTMLAnchorElement | null =>
    document.querySelector<HTMLAnchorElement>(".next_page.button");
}
