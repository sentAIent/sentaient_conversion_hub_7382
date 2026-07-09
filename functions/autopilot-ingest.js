const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Autopilot Ingest API
 * 
 * Receives analytics and pixel data from the Sentaient Conversion Hub
 * front-end and stores it in Firestore as the central Customer Data Platform (CDP).
 */
exports.autopilotIngest = onRequest({ cors: true }, (req, res) => {
  return cors(req, res, async () => {
    // Only accept POST requests
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const payload = req.body;
      
      // Basic validation
      if (!payload || !payload.event_name) {
        res.status(400).json({ error: "Missing event_name in payload" });
        return;
      }

      // Add server-side timestamp and IP (if needed)
      const ingestData = {
        ...payload,
        server_timestamp: admin.firestore.FieldValue.serverTimestamp(),
        client_ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown',
      };

      // Store in Firestore Autopilot collection
      const db = admin.firestore();
      const docRef = await db.collection("autopilot_events").add(ingestData);

      // TODO for future: Implement Meta Conversions API (CAPI) forwarder here
      // if (ingestData.forward_to_meta) { ... send to graph.facebook.com ... }

      res.status(200).json({ 
        success: true, 
        message: "Data ingested by Autopilot", 
        id: docRef.id 
      });

    } catch (error) {
      console.error("Autopilot Ingest Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
