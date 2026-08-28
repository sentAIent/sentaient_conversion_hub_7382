import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { triggerHaptic } from '../utils/haptics';

interface AnimatedButtonProps extends PressableProps {
  children?: React.ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | string;
  style?: StyleProp<ViewStyle>;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'none';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  title,
  variant,
  style,
  onPress,
  onPressIn,
  onPressOut,
  hapticType = 'light',
  ...rest
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    if (onPressOut) onPressOut(e);
  };

  const handlePress = (e: any) => {
    if (hapticType !== 'none') {
      triggerHaptic(hapticType);
    }
    if (onPress) onPress(e);
  };

  return (
    <AnimatedPressable
      style={[
        variant && styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        style, 
        animatedStyle
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      {...rest}
    >
      {children ? children : (
        <Text style={[
          variant && styles.textBase,
          variant === 'primary' && styles.textPrimary,
          variant === 'secondary' && styles.textSecondary,
        ]}>
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#00ffcc',
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  textBase: {
    fontSize: 16,
    fontWeight: '700',
  },
  textPrimary: {
    color: '#000',
  },
  textSecondary: {
    color: '#fff',
  }
});
