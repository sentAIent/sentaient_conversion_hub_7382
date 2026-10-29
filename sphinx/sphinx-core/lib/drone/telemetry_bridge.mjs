import dgram from 'dgram';

export const startTelemetryBridge = (broadcastToClients) => {
  const server = dgram.createSocket('udp4');

  server.on('error', (err) => {
    console.error(`[Sphinx Drone] Telemetry bridge error:\n${err.stack}`);
    server.close();
  });

  let lastBroadcast = 0;
  server.on('message', (msg, rinfo) => {
    try {
      const data = msg.toString('utf-8');
      const parts = data.split(',');
      if (parts.length >= 5) {
        const now = Date.now();
        if (now - lastBroadcast < 500) return; // Throttle to 2Hz max
        lastBroadcast = now;
        
        const payload = {
          type: 'drone_telemetry',
          lat: parseFloat(parts[0]),
          lon: parseFloat(parts[1]),
          alt: parseFloat(parts[2]),
          speed: parseFloat(parts[3]),
          battery: parseFloat(parts[4]),
          timestamp: Date.now()
        };
        broadcastToClients(payload);
      }
    } catch (e) {
      console.error('[Sphinx Drone] Parse error', e);
    }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`[Sphinx Drone] Telemetry UDP bridge listening on ${address.address}:${address.port}`);
  });

  server.bind(14550); // Standard MAVLink / Ground Station port
};
