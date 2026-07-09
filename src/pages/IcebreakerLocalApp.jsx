import React, { useEffect, useState } from 'react';

export default function IcebreakerLocalApp() {
  const [iframeUrl, setIframeUrl] = useState('http://localhost:8081/');

  useEffect(() => {
    // Strip the /icebreaker prefix from the path so Expo matches it at the root
    let path = window.location.pathname;
    if (path.startsWith('/icebreaker')) {
      path = path.replace('/icebreaker', '');
    }
    if (path === '') path = '/';
    
    const search = window.location.search;
    setIframeUrl(`http://localhost:8081${path}${search}`);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        src={iframeUrl} 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Icebreaker Local Dev App"
      />
    </div>
  );
}
