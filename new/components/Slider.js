import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from "@react-native-community/slider";

export default function SliderComponent({ passSteps, passGuidance }) {
  const [samplingValue, setSamplingValue] = React.useState(45);
  const [guidanceValue, setGuidanceValue] = React.useState(50);
 
  // Handle sampling steps change
  const handleStepChange = (x) => {
    setSamplingValue(x);
    passSteps(x);
  }

  // Handle guidance change
  const handleGuidanceChange = (x) => {
    setGuidanceValue(x);
    passGuidance(x);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.captionText}>Sampling Steps</Text>
      <Slider
        style={styles.slider}
        minimumValue={3}
        maximumValue={50}
        step={1}
        value={samplingValue}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#9DA58D"
        thumbTintColor='#6750A4'
        onValueChange={handleStepChange}
      />
      <Text style={styles.sliderValue}>{samplingValue}</Text>
      <Text style={styles.captionText}>Guidance</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={0.1}
        value={guidanceValue}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#9DA58D"
        thumbTintColor='#6750A4'
        onValueChange={handleGuidanceChange}
      />
      <Text style={styles.sliderValue}>{guidanceValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  slider: {
    width: 400,
    height: 40,
  },
  sliderValue: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Arial',
    letterSpacing: 3,
    paddingBottom: 30
  },
  captionText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arial',
    letterSpacing: 3,
  },
});
