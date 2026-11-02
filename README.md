# Neon Void Survivor

Neon Void Survivor is a browser-based neon survival shooter built with vanilla
HTML, CSS and JavaScript.

## Play locally

Run the project from a local web server. Opening `index.html` directly can
disable service workers and some browser APIs.

```bash
npx serve .
```

Then open the URL printed by the server.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow that publishes the project
root whenever changes are pushed to `master`.

1. Open **Settings > Pages** in the repository.
2. Set **Source** to **GitHub Actions**.
3. Push to `master` and wait for the `Deploy to GitHub Pages` workflow.

## Poki advertising

The published Poki page provides `PokiSDK`. The game uses:

- `commercialBreak()` for occasional game-over interstitials.
- `rewardedBreak()` for revive, XP boost and coin rewards.

Ads are disabled safely when the SDK is unavailable in local development.
Poki must approve and host the game before production ads are served.

## Controls

- `WASD` / arrow keys: move
- `Space`: dash
- Mouse/touch: move with the virtual joystick
- Double-tap on touch: dash

## Project notes

`android/` and `www/` are generated Capacitor output and are intentionally
ignored. The root files are the source of truth for the Poki web build.
