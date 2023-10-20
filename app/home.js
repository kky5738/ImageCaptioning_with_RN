import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker'; // Import the library
import * as tf from "@tensorflow/tfjs"
import {fetch} from "@tensorflow/tfjs-react-native"
import * as jpeg from "jpeg-js"

import { pipeline } from '@xenova/transformers';

const pipe = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');

const Home = () => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false)

  const openImagePicker = async () => {
    const options = {
      title: 'Select Image',
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop 
      quality: 1, // go for higest quality possible
      aspect: [4, 3], // maintain aspect ratio of the crop area on Android; on iOS crop area is always a square
    };
    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync(options)

    if (!result.canceled) {
      setImage( {uri: result.assets[0].uri} )
    } else if (result.error) {
      alert('ImagePicker Error: ', result)
    } else {
      alert('User cancelled image picker')
    }
    
  };

  const generateCaption = async () => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    setIsLoading(true);

    try {

      const imageTensor = await imageToTensor(image)
      const caption = await pipe(imageTensor)

      

      // Handle the API response and set the caption
      if (caption) {
        setCaption(caption);
      } else {
        setCaption('Caption not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const imageToTensor = async (source) => {
    // load the raw data of the selected image into an array
    const response = await fetch(source.uri, {}, { isBinary: ture})
    const rawImageData = await response.arrayBuffer()
    const {width, height, data} = jpeg.decode(rawImageData, {
      useTArray: true, // Uint8Array = true
    })

    // remove the alpha channel
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0
    for (let i = 0; i< buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]
      offset += 4
    }

    // transform image data into a tensor
    const img = tf.tensor3d(buffer, [width, height, 3])

    // calculate square center crop area
    const shorterSide = Math.min(width, height)
    const startingHeight = (height - shorterSide) / 2
    const startingWidth = (width - shorterSide) / 2
    const endingHeight = startingHeight + shorterSide
    const endingWidth = startingWidth + shorterSide

    // slice and resize the Image
    const sliced_img = img.slice(
      [startingWidth, startingHeight, 0],
      [endingWidth, endingHeight, 3]
    )
    const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224])

    // add a fourth batch dimension to the tensor
    const expanded_img = resized_img.expandDims(0)

    // normalize the rgb values to -1~+1
    return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1))
  }

  return (
    <View>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'My home',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      {image ? (
        <Image source={{ uri: image }} style={{ width: 224, height: 224 }} />
      ) : null}
      <Button title="Select Image" onPress={openImagePicker} />
      <Button title="Generate Caption" onPress={generateCaption} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{caption}</Text>
      )}
    </View>
  );
}

export default Home