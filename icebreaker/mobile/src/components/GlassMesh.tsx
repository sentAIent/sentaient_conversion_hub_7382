import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  LinearGradient,
  Rect,
  vec,
  BackdropFilter,
  Blur,
  Fill,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

export default function GlassMesh() {
  const { width, height } = useWindowDimensions();
  const hueShift = useSharedValue(0);

  useEffect(() => {
    hueShift.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 5000 }),
        withTiming(0, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={['#FF007F', '#7F00FF', '#00FFFF']}
        />
      </Rect>
      <BackdropFilter filter={<Blur blur={30} />}>
        <Fill color="rgba(0, 0, 0, 0.2)" />
      </BackdropFilter>
    </Canvas>
  );
}
