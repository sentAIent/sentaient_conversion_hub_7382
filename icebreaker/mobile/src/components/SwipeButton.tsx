import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

interface SwipeButtonProps {
  onSwipeComplete: () => void;
  loading: boolean;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipeComplete, loading }) => {
  const SWIPE_WIDTH = 300;
  const BUTTON_SIZE = 60;
  const MAX_TRANSLATE = SWIPE_WIDTH - BUTTON_SIZE - 10;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      if (loading) return;
      let nextX = startX.value + event.translationX;
      if (nextX < 0) nextX = 0;
      if (nextX > MAX_TRANSLATE) nextX = MAX_TRANSLATE;
      translateX.value = nextX;
    })
    .onEnd(() => {
      if (loading) return;
      if (translateX.value > MAX_TRANSLATE * 0.8) {
        translateX.value = withSpring(MAX_TRANSLATE);
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
        runOnJS(onSwipeComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedTextOpacity = useAnimatedStyle(() => {
    return {
      opacity: 1 - translateX.value / (MAX_TRANSLATE * 0.5),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedTextOpacity]}>
        {loading ? 'Processing...' : 'Swipe to Pay ➔'}
      </Animated.Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.knob, animatedStyle]}>
          <Text style={styles.knobIcon}>💸</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 70,
    backgroundColor: '#111',
    borderRadius: 35,
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 1,
  },
  knob: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00ffcc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#00ffcc',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  knobIcon: {
    fontSize: 24,
  },
});
