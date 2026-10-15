<div align="center">

# 🎧 JamRoom

**Zero-Login, Sub-Second WebRTC Audio Broadcast Room**

*Turn any desktop browser into a private, high-fidelity audio broadcast station.*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Vercel%20%2B%20LiveKit-black.svg)](https://livekit.io)
[![WebRTC](https://img.shields.io/badge/WebRTC-SFU%20Architecture-blue.svg)](https://webrtc.org)
[![Audio](https://img.shields.io/badge/Audio-Stereo%20128kbps%20Opus-1DB954.svg)](#)
[![Latency](https://img.shields.io/badge/Latency-%3C100ms%20Sync-purple.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-key-features) • [Architecture](#-architecture) • [Quickstart](#-2-minute-deployment) • [Multi-Room Sync](#-multi-speaker-sync-guide) • [Legal](#-legal--fair-use-disclaimer)

---

</div>

## 💡 Overview

**JamRoom** is a lightweight, open-source web application deployed on Vercel that allows a single **Host** to stream system or browser tab audio (e.g., Spotify, YouTube, SoundCloud, DAW monitor) to **unlimited Listeners** with sub-second (~50ms) latency.

Built using an enterprise-grade **Selective Forwarding Unit (SFU)** architecture (powered by [LiveKit](https://livekit.io)), JamRoom avoids the classic NAT and cellular traversal failures of pure P2P networks, allowing phones on 4G/5G, tablets, and laptops to connect 100% of the time without logins or installs.

---

## ✨ Key Features

- ⚡ **Sub-Second Synchronization:** Direct WebRTC SFU streaming with ~50ms–100ms global latency.
- 🎧 **Zero-Login & Zero-Install:** Listeners don't need an account, app, or Spotify subscription. Any modern desktop or mobile browser can tune in with a 6-digit code or direct link.
- 🌐 **100% Cellular & Firewall Traversal:** Built on cloud SFU edge relays—zero Symmetric NAT / CGNAT packet drops on mobile data.
- 🎛️ **High-Fidelity Stereo Audio:** Captures and encodes high-bitrate stereo Opus audio (`echoCancellation: false`, `autoGainControl: false`, `noiseSuppression: false`, `dtx: false`) preventing voice filters from distorting music.
- 🚀 **Zero Host Upload Bottleneck:** The host uploads **one single stream** to the cloud SFU, which fans out the audio to 10, 50, or 100+ listeners without overloading home internet.
- 📱 **Mobile Autoplay Mitigation:** Native audio session pre-unlocking and unmissable fallback banners satisfying iOS Safari and Android Chrome media restrictions.
- 🐞 **Live WebRTC Inspector:** Built-in real-time diagnostic drawer inspecting ICE connection states, packet flow, and browser audio rendering.

---

## 🏗️ Architecture

```
                 ┌────────────────────────────────┐
                 │       HOST (Mac / PC)          │
                 │   Chrome Tab Playing Audio     │
                 └──────────────┬─────────────────┘
                                │ WebRTC Publish (1 stream)
                                ▼
                 ┌────────────────────────────────┐
                 │   LiveKit Cloud SFU (Edge)     │
                 │   Selective Forwarding Unit    │
                 └──────┬───────────────┬─────────┘
                        │               │ WebRTC Fan-Out
        ┌───────────────┘               └───────────────┐
        ▼                                               ▼
┌───────────────┐                               ┌───────────────┐
│  Mobile (5G)  │                               │ Laptop (Wi-Fi)│
│ <100ms Latency│                               │ <100ms Latency│
└───────────────┘                               └───────────────┘
```

---

## 🚀 2-Minute Deployment (Vercel + LiveKit)

### Prerequisites
1. A free [LiveKit Cloud](https://cloud.livekit.io) account (50 GB free bandwidth every month, no credit card required).
2. A free [Vercel](https://vercel.com) account.

### Step 1: Clone and Push to GitHub
```bash
git clone https://github.com/<your-username>/jam-room.git
cd jam-room
```

### Step 2: Get Free LiveKit Keys
1. In your **[LiveKit Cloud Dashboard](https://cloud.livekit.io)**, create a new project.
2. In **Settings &rarr; Keys**, note:
   - **WebSocket URL:** `wss://<your-project>.livekit.cloud`
   - **API Key:** `APIxxxxxxxxx`
   - **API Secret:** `xxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Deploy to Vercel
1. Import the repository into **[Vercel](https://vercel.com)**.
2. In **Settings &rarr; Environment Variables**, add:
   - `LIVEKIT_URL` = `wss://<your-project>.livekit.cloud`
   - `LIVEKIT_API_KEY` = your LiveKit API Key
   - `LIVEKIT_API_SECRET` = your LiveKit API Secret
3. Click **Deploy**. Your room is live!

---

## 🔊 Multi-Speaker Sync Guide ("Party Mode")

When streaming between devices in the **same physical room**:

* **The Acoustic Effect:** The host computer plays directly from hardware ($0\text{ms}$), while remote devices receive audio over the network at ~$30\text{ms}-50\text{ms}$. In acoustics, delays $>15\text{ms}$ create an audible stadium echo (*Haas Effect*).
* **The Solution:** 
  1. **Mute the original Spotify tab** on the host Mac/PC (right-click tab &rarr; *Mute Tab*). Screen audio capture continues streaming even when muted!
  2. If the host also wants to hear music from computer speakers, join the room as a **Listener** in another tab.
  3. When all devices (Mac, phones, Bluetooth speakers) listen to the LiveKit stream, they all play in **lockstep synchronization with zero echo**.

---

## 📁 Repository Structure

```text
jam-room/
├── api/
│   └── token.js       # Vercel Serverless Function to mint LiveKit JWT tokens
├── public/
│   ├── index.html     # Single Page Application (Tailwind + LiveKit Client SDK)
│   ├── privacy.html   # Privacy Policy
│   └── terms.html     # Terms of Service & Legal Disclaimer
├── .env.example       # Template for LiveKit credentials
├── vercel.json        # Static & serverless routing config
├── package.json       # Metadata & livekit-server-sdk
├── LICENSE            # MIT License
└── SECURITY.md        # Security policy & vulnerability reporting
```

---

## 🛡️ Security & Privacy

- **Zero Data Collection:** JamRoom does not collect emails, passwords, cookies, or personal tracking identifiers.
- **Ephemeral Rooms:** Rooms and access tokens dissolve the moment the host leaves.
- **No Audio Recording:** WebRTC streams are forwarded strictly in-memory by the SFU and are never recorded or stored to disk.
- Read our full [Privacy Policy](public/privacy.html) and [Terms of Service](public/terms.html).

---

## ⚖️ Legal & Fair Use Disclaimer

- **Non-Affiliation:** JamRoom is an independent open-source project and is **not affiliated with, endorsed by, or sponsored by Spotify AB**, YouTube, Google, Apple, or any of their affiliates.
- **General-Purpose Communication:** This software is provided for personal communication, software research, and educational purposes.
- **User Responsibility:** Users are solely responsible for ensuring they possess all necessary rights, licenses, or authorizations to stream any media content.

---

## 🤝 Contributing

Contributions, bug reports, and pull requests are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
