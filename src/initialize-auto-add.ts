namespace AutoAdd {
  export const initializeAutoAdd = async (state: AutoAddState): Promise<void> => {
    state.bundledGames = collectGameFormBodies();

    if (!state.button) return;
    const button = state.button;

    if (isAutoAddEnabled()) {
      button.textContent = "Auto-add is running. Click to stop.";
      button.addEventListener(
        "click",
        () => {
          setAutoAddEnabled(false);
          button.textContent = "Auto-add stopped. Click again to start it.";
        },
        { once: true }
      );

      if (state.bundledGames.length) {
        button.textContent = `Adding ${state.bundledGames.length} game(s) to your library. Click to stop auto-add.`;
        await processNextGame(state);
      } else {
        const nextPageButton = getNextPageControl();
        if (nextPageButton) {
          button.textContent =
            "No new games on this page. Moving to the next page now. Click to stop auto-add.";
          nextPageButton.click();
        } else {
          setAutoAddEnabled(false);
          button.textContent = "Done. All games in this bundle were added to your library.";
        }
      }

      return;
    }

    button.textContent = "Start auto-add for all games in this bundle";
    button.addEventListener(
      "click",
      async () => {
        button.style.cursor = "";
        setAutoAddEnabled(true);
        state.bundledGames = collectGameFormBodies();

        if (!state.bundledGames.length) {
          const nextPageButton = getNextPageControl();
          if (nextPageButton) {
            button.textContent =
              "No new games on this page. Moving to the next page now. Click to stop auto-add.";
            nextPageButton.click();
          } else {
            setAutoAddEnabled(false);
            button.textContent = "No more games are available to add in this bundle.";
          }
          return;
        }

        button.textContent = `Adding ${state.bundledGames.length} game(s) to your library. Click to stop auto-add.`;
        await processNextGame(state);
      },
      { once: true }
    );

    if (state.bundledGames.length) {
      button.textContent = `Found ${state.bundledGames.length} game(s) not yet in your library. Click to add all.`;
    } else if (getNextPageControl()) {
      button.textContent =
        "No new games on this page. Click to continue auto-add from the next page.";
    } else {
      button.textContent = "No more games are available to add in this bundle.";
    }
  };
}
