import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {ActivityIndicator, Button, StyleSheet, View, ScrollView, Text, Pressable, useWindowDimensions} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'

import ImageViewerComponent from './components/ImageViewer'
import PromptInputComponent from './components/PromptInput';
import BreathingComponent from './components/Breathing';
import DropDownComponent from './components/DropDown';

const assetImage = require('./assets/avocado.jpg');

export default function App() {
  const [modelID, setModelID] = useState('prompthero/openjourney')
  const [parameters, setParameters] = useState('') // model parameters
  const [activity, setActivity] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [returnedCaption, setReturnedCaption] = useState('caption');
  const [image, setImage] = useState(assetImage)
  const [base64Image, setBase64Image] = useState(null)
  const {width} = useWindowDimensions();
  const [error, setError] = useState(false)

  const passModelIDWrapper = (x) => {
      setModelError(false);
      setModelID(x)};
  
  useEffect(() => {
    if (parameters != ''){
      setActivity(true);
      console.log(typeof base64Image)
      // http://localhost:8081/api
      // 192.168.35.191:8081/api
      axios.post("http://10.20.104.13:8081/api", {
      // Create Body to send to our backend
      image: base64Image,
      modelID: modelID
    })
    .then(response => { // post 요청의 결과가 왔을 때

      console.log("Generated caption:", response.data.output);
      setActivity(false);
      setReturnedCaption(response.data.output);
    })
    .catch(function (error) { // error 발생 시
      setActivity(false);
      setModelError(true);
      console.log(error);
    });
  }
  },[parameters]);

  const openImagePicker = async () => {
    const options = {
      title: 'Select Image',
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop 
      quality: 1, // go for higest quality possible
      aspect: [4, 3], // maintain aspect ratio of the crop area on Android; on iOS crop area is always a square
      base64: true,
    };
    // Launch the image picker
    // if (useCamera) {
    //   ImagePicker.requestCameraPermissionsAsync()
    //   let result = await ImagePicker.launchCameraAsync(options)
    // } else {
    //   let result = await ImagePicker.launchImageLibraryAsync(options)
    // }

    let result = await ImagePicker.launchImageLibraryAsync(options)
  
    if (!result.canceled) {
      setImage( {uri: result.assets[0].uri} )
      setBase64Image({uri: result.assets[0].base64})
    } else if (result.error) {
      alert('ImagePicker Error: ', result)
      setError(result.error)
    } else {
      alert('User cancelled image picker')
    }    
  }; 

  const reset = () => {
    setReturnedCaption(null)
    setImage(null)
    setError(false)
  }

  let status, statusMessage, showReset;
  const resetLink = (
    <Text onPress={reset} style={styles.reset}>
      Restart
    </Text>
  )

  if (!error) {
    
    if (image && returnedCaption) {
      status = "finished"
      statusMessage = "Caption generated"
      showReset = true
    } else if (image && !returnedCaption) {
      status = "modelCaptioning"
      statusMessage = "Model is captioning..."
    }
  } else {
    statusMessage = "Unexpected errer occured."
    showReset = true
    console.log(error)
  }

  return (
      // Main container
      <View style={styles.titlecontainer}>
        <BreathingComponent /> 
        <ScrollView scrollY={true} style={styles.ScrollView}> 
          {width > 1000 ? (<View style={styles.rowContainer}>
              {/* Left column */}
              <View style={styles.columnContainer}>
                  <View>
                    <PromptInputComponent passPrompt={passPromptWrapper} />
                  </View>
                  <View style={styles.rowContainer}>
                    <DropDownComponent passModelID={passModelIDWrapper} />
                      <View style={styles.columnContainer}>
                      {activity ?
                        <ActivityIndicator size="large" color="#B58392" style={styles.activityIndicator} /> :
                        <Pressable
                          onPress={() => { setParameters(`${base64Image}-${modelID}`); } }
                          style={({ pressed }) => [{ backgroundColor: pressed ? '#9DA58D' : '#958DA5', }, styles.button]}>
                          {({ pressed }) => (<Text style={styles.promptText}>{pressed ? 'INFERRED!' : 'Inference'}</Text>)}
                        </Pressable>}
                      {modelError ? <Text style={styles.promptText}>Model Error!</Text>:<></>}
                      </View>
                    </View>
                </View>
                {/* Right column */}
                <View style={styles.columnContainer}>
                  <View style={styles.columnContainer}>
                    <ImageViewerComponent PlaceholderImage={image} />
                    <Text style={styles.promptText}>{returnedCaption}</Text>
                  </View>
                </View>
             
          </View>) : 
          (<View style={styles.columnContainer}>
            {/* <PromptInputComponent passPrompt={passPromptWrapper} /> */}
            <View>
                <DropDownComponent passModelID={passModelIDWrapper} />
                {/* <Button title="Generate Caption" onPress={!caption ? generateCaption : () => {}} /> */}
                <Button title="Select Image" onPress={openImagePicker} />              
                {/* <Button title="Take Picture" onPress={openImagePicker(useCamera=true)} />                 */}
                {modelError ? <Text style={styles.promptText}>Model Error!</Text>:<></>}
                
                <ImageViewerComponent PlaceholderImage={image} />
                {activity ?
                  <ActivityIndicator size="large" color="#B58392"/> :
                  <Pressable
                    onPress={() => { setParameters(`${base64Image}-${modelID}`); } }
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#9DA58D' : '#958DA5', }, styles.button]}>
                    {({ pressed }) => (<Text style={styles.promptText}>{pressed ? 'GENERATING!' : 'Generate'}</Text>)}
                  </Pressable>}
                <Text style={styles.promptText}>{returnedCaption}</Text>
                <Text>
                  {statusMessage} {showReset ? resetLink : null}
                </Text>
            </View>
          </View>)}
        </ScrollView><StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  canvascontainer: {
    backgroundColor: '#25292e',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50
  },
  titlecontainer: {
    backgroundColor: '#25292e',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50
  },
  rowContainer: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    overflow: 'auto',
    padding: 20
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  button:{
    fontFamily: 'Arial',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
  activityIndicator:{
    marginLeft: 50
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 30
  },
  ScrollView: {
    backgroundColor: '#25292e',
    marginTop: 50,
    padding: 5
  }
});

registerRootComponent(App);