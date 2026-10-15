# JamRoom (v2.0) - LiveKit SFU WebRTC Audio Broadcast Room

A Google Meet/Zoom-style WebRTC audio broadcast application deployed on Vercel. One **Host** streams Spotify or tab audio to **unlimited Listeners** with sub-second (~50-100ms) latency, zero NAT/cellular failures, and multi-device synchronization using **LiveKit Cloud SFU**.

---

## ⚡ Why LiveKit SFU (vs Pure P2P)?

- **100% Reliable Connectivity:** Direct P2P fails on ~30% of mobile cellular networks due to Symmetric NAT / Carrier-Grade NAT. LiveKit's global Selective Forwarding Units (SFUs) are hosted on public cloud edge IPs, meaning **phones on 4G/5G, laptops, and mobile browsers connect 100% of the time**.
- **No Host Upload Burden:** Host uploads **one single stream** to LiveKit Cloud. The cloud server duplicates and fans out the stream to all listeners.
- **Perfect Sync & Low Latency:** Sub-second (50ms - 100ms) WebRTC synchronization across every device.
- **RFC 2198 Audio Redundancy & Music Bitrate:** Disables DTX (continuous music) and adds packet loss redundancy for crystal-clear music.

---

## 🛠️ 2-Minute Setup Guide (Free LiveKit Cloud)

LiveKit Cloud offers a generous **free tier (50 GB bandwidth/month free forever, no credit card required)**.

### Step 1: Get Free Keys from LiveKit
1. Sign up for free at **[cloud.livekit.io](https://cloud.livekit.io)**.
2. Create a new project (e.g. `jam-room`).
3. In your project dashboard, go to **Settings &rarr; Keys** and copy:
   - **WebSocket URL:** `wss://your-project.livekit.cloud`
   - **API Key:** `APIxxxxxxxxx`
   - **API Secret:** `xxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Add Keys to Vercel
1. Go to your **[Vercel Dashboard](https://vercel.com)** &rarr; click on your `sp-tan-one` project.
2. Go to **Settings &rarr; Environment Variables**.
3. Add the following 3 variables:
   - `LIVEKIT_URL` = `wss://your-project.livekit.cloud`
   - `LIVEKIT_API_KEY` = your API key
   - `LIVEKIT_API_SECRET` = your API secret
4. Redeploy your project (or push the new code to trigger a redeploy).

---

## 🚀 How to Broadcast Audio

### For the Host (Computer)
1. Open the deployed Vercel site and click **Host a Broadcast**.
2. Open Spotify in a **Chrome/Edge browser tab** ([open.spotify.com](https://open.spotify.com)).
3. Click **Start Audio Broadcast**.
4. When prompted by the browser:
   - Select the **Chrome Tab** where Spotify is playing.
   - **Crucial:** Make sure the checkbox **"Also share tab audio"** is checked!
5. Share the 6-digit room code or invite URL with your friends.

### For Listeners (Phones, Tablets, Laptops)
1. Open the Vercel site on your phone and enter the 6-digit code (or click the invite URL).
2. Tap **Connect to Room**.
3. If prompted by your mobile browser, tap **"Tap to Enable Audio 🔊"**.
4. Live audio will stream in sync with sub-second latency!
