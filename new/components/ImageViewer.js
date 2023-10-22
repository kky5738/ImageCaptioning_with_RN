import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ PlaceholderImage }) {
  return (
    <Image source={PlaceholderImage} style={styles.imageStyle} />
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});