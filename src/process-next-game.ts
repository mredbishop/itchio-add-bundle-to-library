namespace AutoAdd {
  export const processNextGame = async (state: AutoAddState): Promise<void> => {
    if (!isAutoAddEnabled()) {
      setButtonText(state.button, "Auto-add is paused.");
      return;
    }

    const game = state.bundledGames.pop();
    if (game) {
      setButtonText(
        state.button,
        `Adding ${state.bundledGames.length + 1} game(s) to your library. Click to stop auto-add.`
      );
      await postGameToLibrary(game);
      await processNextGame(state);
      return;
    }

    const nextPageButton = getNextPageControl();
    if (nextPageButton) {
      setButtonText(
        state.button,
        "No new games on this page. Moving to the next page now. Click to stop auto-add."
      );
      nextPageButton.click();
      return;
    }

    setAutoAddEnabled(false);
    setButtonText(
      state.button,
      "Done. All games in this bundle were added to your library."
    );
  };
}
