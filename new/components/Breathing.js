import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';

const INIT_TEXT = "IMAGE-CAPTION"
const TEXT_LEN = INIT_TEXT.length

export default function Breathing() {
  // Create an array of Animated values using useRef
  const animatedValues = useRef([...Array(TEXT_LEN)].map(() => new Animated.Value(0))).current;
  const {width} = useWindowDimensions();

  useEffect(() => {
    // Define animations for each value in animatedValues
    const animations = animatedValues.map((animatedValue, index) => {
      // Animation for increasing value
      const animation1 = Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      });

      // Animation for decreasing value
      const animation2 = Animated.timing(animatedValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      });

      const fast = 300;
      const medium = 450;
      const slow = 600;
      // Define delays for each animation
      const delays = [
        index * fast,
        index * medium,
        (TEXT_LEN - 1 - index) * fast,
        index * slow,
        (TEXT_LEN - 1 - index) * medium,    
        index * fast,
        (TEXT_LEN - 1 - index) * slow,
        index * medium,
        (TEXT_LEN - 1 - index) * fast,
        (TEXT_LEN - 1 - index) * medium,
        index * slow,
        (TEXT_LEN - 1 - index) * slow,
      ];

      // Create a sequence of animations with delays
      const animationSequence = delays.map((delay, index) => {
        return Animated.sequence([
          Animated.delay(delay),
          animation1,
          animation2,
        ]);
      });

      // Create a sequence of all animation sequences
      const animationSequences = Animated.sequence(animationSequence);
      
      // Create a loop for the animation sequence
      return Animated.loop(animationSequences);
    });

    // Start all animations
    animations.forEach((animation) => {
      animation.start();
    });
  }, [animatedValues]);

  // Interpolate animations to map values to desired output range
  const interpolateAnimations = animatedValues.map((animatedValue) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: width > 1000 ? [60, 90] : [20, 30],
      extrapolate: 'clamp',
    })
  );

  // Create animated styles based on interpolated values
  const animatedStyles = interpolateAnimations.map((interpolateAnimation) => ({
    fontSize: interpolateAnimation,
  }));

  return ( // 원래 text는 REACT-NATIVE
    <View style={styles.containerbreathing}>
      <Text style={styles.heading}> 
        <Animated.Text style={[styles.char, animatedStyles[0]]}>I</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[1]]}>M</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[2]]}>A</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[3]]}>G</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[4]]}>E</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[5]]}>-</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[6]]}>C</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[7]]}>A</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[8]]}>P</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[9]]}>T</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[10]]}>I</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[11]]}>O</Animated.Text>
        <Animated.Text style={[styles.char, animatedStyles[12]]}>N</Animated.Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    containerbreathing: {
      flex: 1/8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontWeight: 'bold',
      color: '#6750A4',
      position:'absolute',
      top:0,
      left: 0,
    },
    char: {
      marginHorizontal: 15,
    },
  });