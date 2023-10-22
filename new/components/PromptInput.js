import React from 'react';
import { StyleSheet, TextInput, useWindowDimensions } from 'react-native';

export default function PromptInputComponent({ passPrompt }) {
  const [text, setText] = React.useState('');
  const {width} = useWindowDimensions();
  
  const textInputStyle = { 
    ...styles.input, width: width > 500 ? 500 : width - 80};
 
  const handleTextChange = (x) => {
    setText(x);
    passPrompt(x);
  }

  return (
    <TextInput 
      style={textInputStyle}
      placeholder='Avocado Armchair'
      multiline
      onChangeText={handleTextChange} 
      value={text}
      maxLength={200} 
    />
  );

};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B58392',
    borderWidth: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderStartWidth: 10,
    borderEndWidth: 10,
    borderRadius: 6,
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontFamily: 'Arial',
  },
});