# Routines

A small personal routine tracker. Set up routines once, choose which days they run, then tick off today's steps. Built to be added to an iPhone home screen, with no accounts, backend or build step.

**Live app:** https://bybriefcase.github.io/routines/

## Features
- **Today:** shows only the routines scheduled for today, with a progress ring, per-routine counts and a celebration when every step is done (once per day).
- **Weekly goals:** a few goals per week that can be ticked on any day. Set them up to a few weeks ahead in Setup.
- **Setup:** add, edit and delete routines (name, days, steps) and manage weekly goals.
- **Backup:** export all data to a `.json` file and import it back, with validation and a confirmation step.
- **Offline:** a service worker caches the app so it opens without a connection.
- Light and dark mode, reduced-motion support, and iPhone safe-area handling.

## Tech
Plain HTML, CSS and JavaScript. No frameworks, libraries or npm.

| File | Purpose |
|---|---|
| `index.html` | Markup, styles and script |
| `manifest.json` | Home-screen app settings |
| `sw.js` | Service worker (offline support) |
| `icon.svg` | Icon source |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | PNG icons (iOS needs PNG) |

## Data
Everything is stored in the browser's `localStorage` under the key `routine-tracker`, so it stays on one device. Use Export and Import to move it between devices.

```json
{
  "version": 1,
  "routines": [{ "id": "", "name": "", "days": [1, 3, 5], "steps": [{ "id": "", "text": "" }] }],
  "log": { "YYYY-MM-DD": { "ticked": { "stepId": true }, "celebrated": false } },
  "weekly": { "YYYY-MM-DD (Monday)": [{ "id": "", "text": "", "done": false }] }
}
```

Days use JavaScript `getDay()` numbers (Sunday = 0). Dates are built from local date parts, never `toISOString()`.

## Run locally
Service workers need a server, so don't open the file directly:

```
python -m http.server 8000
```

Then visit http://localhost:8000.

## Updating
Push to `main` and GitHub Pages redeploys. When you change app files, bump `CACHE` in `sw.js` (for example `routines-v9`) so old caches are deleted. Pushing code never touches users' saved data.

## Add to iPhone
Open the live link in Safari, let it load once, tap Share, then Add to Home Screen.

## Reminders
Browsers can't schedule notifications from a static site. For a 7:30am nudge, use an iOS Shortcuts personal automation (Time of Day, then Show Notification).
