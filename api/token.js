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

  const livekitUrl = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

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

  try {
    const isHostBool = isHost === 'true';
    const participantName = username || (isHostBool ? 'Host' : 'Listener');
    const participantIdentity = `${isHostBool ? 'host' : 'listener'}_${Math.random().toString(36).substring(2, 8)}`;

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
      ttl: '6h'
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
      identity: participantIdentity,
      room: `jam_${room}`
    });
  } catch (err) {
    console.error('Token generation error:', err);
    return res.status(500).json({ error: 'Failed to generate LiveKit token', message: err.message });
  }
};
