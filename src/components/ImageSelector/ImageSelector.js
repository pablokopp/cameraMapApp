import {Button, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import React, {useState} from 'react';

import {COLORS} from '../../constants/index';
import {launchCamera} from 'react-native-image-picker';

const ImageSelector = ({onImage}) => {
  const [pickedResponse, setPickedResponse] = useState();

  const IS_IOS = Platform.OS === 'ios';

  const handleTakePicture = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    let granted;

    //pedir permisos
    if (IS_IOS) {
      granted = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      granted = await request(PERMISSIONS.ANDROID.CAMERA);
    }

    if (granted === RESULTS.GRANTED) {
      launchCamera(options, res => {
        if (!res.didCancel && !res.error) {
          setPickedResponse(res.assets[0]);
          onImage && onImage(res.assets[0].uri);
        }
      });
    } else {
      console.warn('Permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedResponse ? (
          <Text>No hay una imagen seleccionada</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedResponse.uri}} />
        )}
      </View>
      <Button
        title="Tomar foto"
        onPress={handleTakePicture}
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
