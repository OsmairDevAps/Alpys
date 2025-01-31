import React, {useEffect} from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedProps,
  ReduceMotion,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LoadingLogo = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    // progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
    progress.value = withRepeat(withTiming(1, { duration: 10000 }), -1, false, () => {}, ReduceMotion.Never);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * 188, // 188 é a circunferência do círculo (2 * π * r)
  }));

  return (
    <View className='flex-1 justify-center items-center'>
      <View className='absolute justify-center items-center'>
        <Image source={require('../assets/images/alpys.png')} className='w-20 h-20' />
      </View>

      <Svg height="100" width="100" className='transform -rotate-90'>
        <Circle
          cx="50"
          cy="50"
          r="40"
          stroke="transparent"
          strokeWidth="10"
          fill="none"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="40"
          stroke="#ff8800" // Cor da borda animada
          strokeWidth="10"
          fill="none"
          strokeDasharray="188" // Circunferência do círculo
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

export default LoadingLogo;