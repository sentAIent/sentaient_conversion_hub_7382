import { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * A hook to load textures asynchronously without triggering React Suspense.
 * This prevents the entire 3D Canvas from hanging during initial load.
 */
export const useAsyncTexture = (url) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!url) return;
    
    let isMounted = true;
    const loader = new THREE.TextureLoader();
    
    loader.load(
      url,
      (tex) => {
        if (isMounted) {
          setTexture(tex);
        }
      },
      undefined, // onProgress
      (err) => {
        console.error('Error loading async texture:', url, err);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  return texture;
};
