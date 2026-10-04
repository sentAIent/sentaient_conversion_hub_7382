import NodeMediaServer from 'node-media-server';

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

export const startRTMPServer = () => {
  const nms = new NodeMediaServer(config);
  
  nms.on('preConnect', (id, args) => {
    console.log('[Sphinx Drone] New client connected id=', id, args);
  });
  
  nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[Sphinx Drone] Stream published id=', id, ' path=', StreamPath);
  });
  
  nms.run();
  console.log('[Sphinx Drone] RTMP server listening on port 1935, HTTP-FLV on port 8000');
};
