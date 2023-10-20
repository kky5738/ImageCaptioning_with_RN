// one thing need to tuseday is review gpt maded sample code
// notion/local에서 ML/DL with RN 살펴보기
// 메이아이 회사 괜찮아 보임
// 엑소디오?
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

import Button from '../components/Butten';
import ImageViewer from '../components/ImageViewr';

const PlaceholderImage = require('../assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
         />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width:320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
