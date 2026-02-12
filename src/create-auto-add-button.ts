namespace AutoAdd {
  export const createAutoAddButton = (
    gameContainer: HTMLElement
  ): HTMLAnchorElement => {
    const existing = document.getElementById(RUN_NOW_BUTTON_ID) as
      | HTMLAnchorElement
      | null;

    if (existing) return existing;

    const button = document.createElement("a");
    button.id = RUN_NOW_BUTTON_ID;
    button.className = "button";
    button.style.background = BUTTON_BACKGROUND;
    button.style.borderColor = BUTTON_BACKGROUND;
    button.style.color = BUTTON_TEXT_COLOR;
    button.style.cursor = "pointer";
    button.style.padding = BUTTON_PADDING;
    button.style.margin = BUTTON_MARGIN;
    button.style.display = "inline-block";

    const anchor = gameContainer.querySelector<HTMLParagraphElement>(
      "p:not([class])"
    );

    if (anchor) {
      gameContainer.insertBefore(button, anchor);
    } else {
      gameContainer.prepend(button);
    }

    return button;
  };
}
