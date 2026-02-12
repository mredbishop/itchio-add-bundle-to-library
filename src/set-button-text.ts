namespace AutoAdd {
  export const setButtonText = (button: NullableButton, text: string): void => {
    if (!button) return;
    button.textContent = text;
  };
}
