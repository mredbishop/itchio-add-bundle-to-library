(() => {
  const RUN_NOW_STORAGE_KEY = "auto-add-to-itchio-library-enabled";
  const RUN_NOW_BUTTON_ID = "auto-add-to-library-button";

  if (!window.location.href.includes("itch.io/bundle/download/")) return;

  const isAutoAddEnabled = (): boolean =>
    localStorage.getItem(RUN_NOW_STORAGE_KEY) === "true";
  const setAutoAddEnabled = (value: boolean): void => {
    localStorage.setItem(RUN_NOW_STORAGE_KEY, String(Boolean(value)));
  };

  const gameContainer = document.querySelector<HTMLElement>(".game_outer");
  if (!gameContainer) return;

  let bundledGames: string[] = [];
  let runNowButton: HTMLAnchorElement | null = document.getElementById(
    RUN_NOW_BUTTON_ID
  ) as HTMLAnchorElement | null;

  const collectGameFormBodies = (): string[] => {
    const gamesElements = document.querySelectorAll<HTMLFormElement>(
      ".game_row form.form"
    );
    return Array.from(gamesElements).map((form) => {
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

  const getNextPageControl = (): HTMLAnchorElement | null =>
    document.querySelector<HTMLAnchorElement>(".next_page.button");

  const postGameToLibrary = async (game: string): Promise<void> => {
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

  const processNextGame = async (): Promise<void> => {
    if (!runNowButton) return;
    if (!isAutoAddEnabled()) {
      runNowButton.textContent = "Auto-add paused.";
      return;
    }

    const game = bundledGames.pop();
    if (game) {
      runNowButton.textContent = `Adding ${bundledGames.length + 1} game(s) to your library. Click to stop.`;
      await postGameToLibrary(game);
      await processNextGame();
      return;
    }

    const nextPageButton = getNextPageControl();
    if (nextPageButton) {
      runNowButton.textContent =
        "No new games on this page. Moving to the next page. Click to stop.";
      nextPageButton.click();
      return;
    }

    setAutoAddEnabled(false);
    runNowButton.textContent = "All games added from this bundle. Auto-add disabled.";
  };

  const createAutoAddButton = (): HTMLAnchorElement => {
    const existing = document.getElementById(RUN_NOW_BUTTON_ID) as
      | HTMLAnchorElement
      | null;
    if (existing) return existing;

    const newButton = document.createElement("a");
    newButton.id = RUN_NOW_BUTTON_ID;
    newButton.className = "button";
    newButton.style.background = "#1f9d55";
    newButton.style.borderColor = "#1f9d55";
    newButton.style.color = "#ffffff";
    newButton.style.cursor = "pointer";
    newButton.style.padding = "10px 14px";
    newButton.style.margin = "12px 0";
    newButton.style.display = "inline-block";
    const anchor = gameContainer.querySelector<HTMLParagraphElement>(
      "p:not([class])"
    );

    if (anchor) {
      gameContainer.insertBefore(newButton, anchor);
    } else {
      gameContainer.prepend(newButton);
    }

    return newButton;
  };

  const initializeAutoAdd = async (): Promise<void> => {
    runNowButton = createAutoAddButton();
    if (!runNowButton) return;
    const button = runNowButton;
    bundledGames = collectGameFormBodies();

    if (isAutoAddEnabled()) {
      button.textContent = "Auto-add running. Click to stop.";
      button.addEventListener(
        "click",
        () => {
          setAutoAddEnabled(false);
          button.textContent = "Auto-add stopped.";
        },
        { once: true }
      );

      if (bundledGames.length) {
        button.textContent = `Adding ${bundledGames.length} game(s) to your library. Click to stop.`;
        await processNextGame();
      } else {
        const nextPageButton = getNextPageControl();
        if (nextPageButton) {
          button.textContent =
            "No new games on this page. Moving to the next page. Click to stop.";
          nextPageButton.click();
        } else {
          setAutoAddEnabled(false);
          button.textContent = "All games added from this bundle. Auto-add disabled.";
        }
      }
      return;
    }

    button.textContent = "Auto-add all games in this bundle";
    button.addEventListener(
      "click",
      async () => {
        button.style.cursor = "";
        setAutoAddEnabled(true);
        bundledGames = collectGameFormBodies();

        if (!bundledGames.length) {
          const nextPageButton = getNextPageControl();
          if (nextPageButton) {
            button.textContent =
              "No new games on this page. Moving to the next page. Click to stop.";
            nextPageButton.click();
          } else {
            setAutoAddEnabled(false);
            button.textContent = "No more games to add in this bundle.";
          }
          return;
        }

        button.textContent = `Adding ${bundledGames.length} game(s) to your library. Click to stop.`;
        await processNextGame();
      },
      { once: true }
    );

    if (bundledGames.length) {
      button.textContent = `Found ${bundledGames.length} unadded game(s) on this page. Click to auto-add all.`;
    } else if (getNextPageControl()) {
      button.textContent =
        "No new games on this page. Click to auto-add from the next page.";
    } else {
      button.textContent = "No more games to add in this bundle.";
    }
  };

  initializeAutoAdd().catch((err: unknown) => {
    console.error("Auto-add script failed:", err);
    setAutoAddEnabled(false);
    if (runNowButton) {
      runNowButton.textContent = "Auto-add error. Check the console for details.";
    }
  });
})();
