import React, {useState, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}>;

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({imageUrl}: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceSix);
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let newImage;

    switch (randomNumber) {
      case 1:
        newImage = DiceOne;
        break;
      case 2:
        newImage = DiceTwo;
        break;
      case 3:
        newImage = DiceThree;
        break;
      case 4:
        newImage = DiceFour;
        break;
      case 5:
        newImage = DiceFive;
        break;
      case 6:
        newImage = DiceSix;
        break;
      default:
        newImage = DiceOne;
        break;
    }

    // Start the roll-out animation
    Animated.timing(translateXAnim, {
      toValue: screenWidth,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // After the roll-out animation, update the image and start the roll-in animation
      setDiceImage(newImage);
      translateXAnim.setValue(-screenWidth);
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          ReactNativeHapticFeedback.trigger("impactLight", options);
          rollDiceOnTap();
        }}
      >
        <Animated.View style={{transform: [{translateX: translateXAnim}]}}>
          <Dice imageUrl={diceImage} />
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={() => {
          ReactNativeHapticFeedback.trigger("impactLight", options);
          rollDiceOnTap();
        }}
      >
        <Text style={styles.rollDiceBtnText}>
          Roll the dice
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    marginBottom: 0,
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default App;
