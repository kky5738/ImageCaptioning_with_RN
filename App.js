import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';

const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={PlaceholderImage} style={styles.image}/>
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
});
