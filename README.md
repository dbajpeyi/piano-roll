# Piano Roll

An 88-key piano that lights up the keys you play on a MIDI keyboard. Toggles for a
computer-keyboard test mode, note names, and chord names.

Live: https://piano-roll.dbajpeyi.workers.dev

## Mac app (floating window)

```bash
npm install
npx install-electron --no   # downloads the Electron runtime
npm start                   # run it
npm run build               # package to dist/mac-arm64/Piano Roll.app
```

## Web

```bash
npm run deploy   # deploys public/ to Cloudflare Workers
```

## Test mode keys

`A W S E D F T G Y H U J K` play an octave from C; `Z` / `X` shift octave down / up.
