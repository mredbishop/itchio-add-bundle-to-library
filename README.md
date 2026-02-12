# itch.io Add Bundle to Library (Chrome Extension)

This repository is a Chrome extension that injects `itchio-bundle-auto-add-content-script.js` on:

- `https://itch.io/bundle/download/*`

The extension adds an in-page button to auto-add games from the current itch.io bundle page into your library.

## Build (npm)

1. Install dependencies:
   - `npm install`
2. Build the extension package:
   - `npm run build`

The output extension package is in `dist/` and a zip is created at `extension.zip`.

## Load locally (for testing)

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `dist/` folder.

## Deploy/package

1. Upload `extension.zip` in the Chrome Web Store Developer Dashboard.

## Notes

- Injection is restricted by `manifest.json` to `https://itch.io/bundle/download/*`.
- The script also has a runtime URL guard for safety.
