# Melody Music

A sleek, mobile-first music player app you can open **directly on your phone browser with zero installation** via GitHub Pages (with full PWA "Add to Home Screen" support), plus an upgraded Flutter Android build!

## Features
- **Instant Phone Web App (PWA)**: Open straight from your GitHub Pages link on iPhone or Android — no app store or installs needed.
- **Real Built-in Music Engine**: 8 original chill, lo-fi, ambient, and synth tracks synthesized live via the Web Audio API (with stereo reverb, delay, and real-time 60fps frequency visualizer).
- **Play Your Own Phone Music**: Import MP3, WAV, M4A, OGG, or FLAC audio files straight from your device.
- **3-Band Equalizer & Presets**: Balanced, Bass Boost, Lo-Fi Warm, Crystal, Night Mode, plus custom Bass/Mid/Treble & Volume sliders.
- **Full Library Experience**: Mood filters, live search, Liked Songs, custom playlists, Up Next queue, Shuffle, Repeat (All / One), Sleep Timer, and lock-screen media controls.
- **Flutter Android App**: Upgraded `lib/main.dart` with GitHub Actions APK build (`.github/workflows/build-apk.yml`).

## Open on Your Phone (GitHub Pages)
1. Push this repository to GitHub (branch `main`).
2. Go to **Settings → Pages** and select **GitHub Actions** (or **Deploy from a branch → `main` / `(root)`**).
3. Open your live link: `https://<your-username>.github.io/<your-repo>/`
4. *(Optional)* Tap **Share → Add to Home Screen** (iOS) or **Install App** (Android) to launch Melody Music fullscreen like a native app.

## Build Android APK (Optional)
Run the **Build Android APK** workflow under the repository's **Actions** tab to download the release `.apk`.
