namespace AutoAdd {
  export const postGameToLibrary = async (game: string): Promise<void> => {
    await fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "same-origin",
      redirect: "manual",
      body: game,
    });
  };
}
