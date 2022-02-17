import * as ImagePicker from 'react-native-image-picker';

import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {COLORS} from '../../constants/index';

const ImageSelector = props => {
  const [pickedUri, setPickedUri] = useState();

  const verifyPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'cameraMapApp Camera Permission',
          message: 'cameraMapApp needs access to your camera',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleTakeImage = async () => {
    const isCameraOk = await verifyPermission();
    if (!isCameraOk) return;

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      setPickedUri(response.assets[0].uri);
    });
  };

  return (
    <View style={StyleSheet.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
          <Text>No hay una imagen seleccionada</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedUri}} />
        )}
      </View>
      <Button
        title="Tomar foto"
        onPress={handleTakeImage}
        color={COLORS.MAROON}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: COLORS.BLUSH,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageSelector;
