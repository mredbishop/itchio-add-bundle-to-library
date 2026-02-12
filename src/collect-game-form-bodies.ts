namespace AutoAdd {
  export const collectGameFormBodies = (): string[] => {
    const forms = document.querySelectorAll<HTMLFormElement>(".game_row form.form");

    return Array.from(forms).map((form) => {
      const fields = Array.from(
        form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          "*[name]"
        )
      );

      return fields
        .map((el) => `${encodeURIComponent(el.name)}=${encodeURIComponent(el.value)}`)
        .join("&");
    });
  };
}
