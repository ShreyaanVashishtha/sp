const { AccessToken } = require('livekit-server-sdk');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { room, isHost, username } = req.query;

  if (!room) {
    return res.status(400).json({ error: 'Missing room query parameter' });
  }

  // Clean environment variables (strip quotes, whitespace, newlines, trailing slashes)
  let livekitUrl = (process.env.LIVEKIT_URL || '').trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
  let apiKey = (process.env.LIVEKIT_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  let apiSecret = (process.env.LIVEKIT_API_SECRET || '').trim().replace(/^["']|["']$/g, '');

  if (!livekitUrl || !apiKey || !apiSecret) {
    return res.status(500).json({
      error: 'LiveKit environment variables are not configured in Vercel.',
      details: 'Please set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET in your Vercel Project Settings (Settings -> Environment Variables).',
      missing: {
        LIVEKIT_URL: !livekitUrl,
        LIVEKIT_API_KEY: !apiKey,
        LIVEKIT_API_SECRET: !apiSecret
      }
    });
  }

  // Auto-detect and fix if user swapped API Key and API Secret
  // LiveKit API keys always start with 'API' (e.g. APIxxxxxxxx)
  if (apiSecret.startsWith('API') && !apiKey.startsWith('API')) {
    console.log('[LiveKit] Detected swapped API Key and API Secret. Automatically swapping back.');
    const temp = apiKey;
    apiKey = apiSecret;
    apiSecret = temp;
  }

  // Ensure URL uses wss:// protocol
  if (livekitUrl.startsWith('http://')) {
    livekitUrl = livekitUrl.replace('http://', 'ws://');
  } else if (livekitUrl.startsWith('https://')) {
    livekitUrl = livekitUrl.replace('https://', 'wss://');
  } else if (!livekitUrl.startsWith('wss://') && !livekitUrl.startsWith('ws://')) {
    livekitUrl = `wss://${livekitUrl}`;
  }

  try {
    const isHostBool = isHost === 'true';
    const participantName = username || (isHostBool ? 'Host' : 'Listener');
    const participantIdentity = `${isHostBool ? 'host' : 'listener'}_${Math.random().toString(36).substring(2, 8)}`;

    // Create AccessToken with numeric seconds TTL (6 hours = 21600s)
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
      ttl: 6 * 3600
    });

    at.addGrant({
      room: `jam_${room}`,
      roomJoin: true,
      canPublish: isHostBool,
      canSubscribe: true,
      canPublishData: true
    });

    const token = await at.toJwt();

    return res.status(200).json({
      token,
      livekitUrl,
      apiKeyPrefix: apiKey.slice(0, 8),
      identity: participantIdentity,
      room: `jam_${room}`
    });
  } catch (err) {
    console.error('Token generation error:', err);
    return res.status(500).json({ error: 'Failed to generate LiveKit token', message: err.message });
  }
};
