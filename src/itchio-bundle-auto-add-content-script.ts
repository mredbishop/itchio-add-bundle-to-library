/// <reference path="./constants.ts" />
/// <reference path="./types.ts" />
/// <reference path="./is-auto-add-enabled.ts" />
/// <reference path="./set-auto-add-enabled.ts" />
/// <reference path="./collect-game-form-bodies.ts" />
/// <reference path="./get-next-page-control.ts" />
/// <reference path="./post-game-to-library.ts" />
/// <reference path="./set-button-text.ts" />
/// <reference path="./create-auto-add-button.ts" />
/// <reference path="./process-next-game.ts" />
/// <reference path="./initialize-auto-add.ts" />

(() => {
  if (!window.location.href.includes("itch.io/bundle/download/")) return;

  const gameContainer = document.querySelector<HTMLElement>(".game_outer");
  if (!gameContainer) return;

  const state: AutoAdd.AutoAddState = {
    bundledGames: [],
    button: AutoAdd.createAutoAddButton(gameContainer),
  };

  AutoAdd.initializeAutoAdd(state).catch((err: unknown) => {
    console.error("Auto-add script failed:", err);
    AutoAdd.setAutoAddEnabled(false);
    AutoAdd.setButtonText(
      state.button,
      "Auto-add hit an error. Check the browser console for details."
    );
  });
})();
