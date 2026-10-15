# JamRoom - Zero-Login WebRTC Audio Broadcast Room

A lightweight, zero-login browser-based web application deployed on Vercel that allows a single **Host** to stream system or tab audio (e.g., Spotify, YouTube, SoundCloud) to multiple **Listeners** with sub-second latency via peer-to-peer WebRTC.

---

## Features

- 🎧 **Zero-Login & Zero-Install:** Listeners don't need a Spotify account, app, or login. Any modern desktop or mobile browser can tune in.
- ⚡ **Sub-Second P2P Latency:** Direct peer-to-peer WebRTC streaming powered by PeerJS and Google STUN servers.
- 🎛️ **Lossless High-Fidelity Audio:** Audio constraints explicitly disable echo cancellation, noise suppression, and auto gain control (`echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 2`), ensuring music streams stereophonically without voice filters.
- 🚀 **Bandwidth-Optimized:** Video tracks captured from screen share are immediately discarded, streaming audio-only.
- 🔗 **Instant Pairing:** 6-digit numeric room codes and direct invite links (`?room=123456`).
- 📱 **Mobile Autoplay Mitigation:** Explicit "Tap to Enable Audio" action satisfying iOS Safari and Chrome mobile media autoplay policies.
- 📊 **Real-time Audio Visualizer:** Web Audio API frequency visualizer giving instant visual feedback for both Host and Listeners.

---

## File Architecture

```text
jam-room/
├── public/
│   └── index.html      # Entire SPA (HTML + Tailwind CDN + PeerJS CDN + JS logic)
├── package.json        # Minimal metadata & local run script (zero build step)
├── vercel.json         # Static hosting configuration
└── README.md           # Documentation & instructions
```

---

## Local Development

Run locally using `npx serve`:

```bash
cd jam-room
npm start
```

Or open `public/index.html` directly in any web browser.

---

## Deployment to Vercel

1. Push this directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of JamRoom"
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com):
   - Click **"Add New Project"** and select the repository.
   - Leave Framework Preset as **Other** (Static Site).
   - Root directory: `./`
   - Build & Output Settings: leave default (no build command required).
3. Click **Deploy**. Your room is live immediately!

---

## How to Use

### For the Host
1. Open the deployed application and click **Host a Broadcast**.
2. A random 6-digit room code is generated (e.g. `482915`).
3. Share the code or click **"Copy Direct Invite Link"** to send to friends.
4. Click **Start Audio Broadcast**.
5. When your browser displays the screen-sharing prompt:
   - Select the **Spotify Tab** (Chrome/Edge) or **Entire Screen** (with system audio enabled).
   - **Crucial:** Make sure to check the checkbox **"Also share tab audio"** or **"Share system audio"**.
6. The host visualizer will activate and audio will broadcast to all connected listeners.

### For Listeners
1. Open the web app or click the invite link shared by the host.
2. If entering manually, type the 6-digit room code and click **Connect to Room**.
3. Tap **"Tap to Enable Audio 🔊"** if prompted by the browser to start listening.
