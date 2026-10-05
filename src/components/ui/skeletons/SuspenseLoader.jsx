import React from 'react';
import { Html } from '@react-three/drei';
import CanvasSkeleton from './CanvasSkeleton';

export default function SuspenseLoader({ message }) {
  return (
    <Html center>
      <CanvasSkeleton message={message} className="w-screen h-screen" />
    </Html>
  );
}
