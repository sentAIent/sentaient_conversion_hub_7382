import NodeMediaServer from 'node-media-server';

const config = {
  rtmp: {
    port: parseInt(process.env.RTMP_PORT || '1935', 10),
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: parseInt(process.env.RTMP_HTTP_PORT || '8000', 10),
    allow_origin: '*'
  }
};

export const startRTMPServer = () => {
  try {
    const nms = new NodeMediaServer(config);
    
    nms.on('preConnect', (id, args) => {
      console.log('[Sphinx Drone] New client connected id=', id, args);
    });
    
    nms.on('prePublish', (id, StreamPath, args) => {
      console.log('[Sphinx Drone] Stream published id=', id, ' path=', StreamPath);
    });
    
    nms.run();
    console.log(`[Sphinx Drone] RTMP server listening on port ${config.rtmp.port}, HTTP-FLV on port ${config.http.port}`);
  } catch (err) {
    console.warn('[Sphinx Drone] RTMP server could not start (port in use?):', err.message);
  }
};
