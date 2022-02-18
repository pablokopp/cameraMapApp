import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {COLORS} from '../constants';
import ImageSelector from '../components/ImageSelector/ImageSelector';
import {addPlace} from '../store/places.actions';
import {useDispatch} from 'react-redux';

const NewPlaceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const handleTitleChange = text => {
    setTitle(text);
  };
  const handleSave = () => {
    dispatch(addPlace(title, image));
    navigation.navigate('Direcciones');
  };
  const handleOnImage = uri => {
    setImage(uri);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Titulo</Text>
        <ImageSelector onImage={handleOnImage} />
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
        />
        <Button
          title="Guardar direccion"
          color={COLORS.MAROON}
          onPress={() => handleSave()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 8,
    padding: 4,
  },
});

export default NewPlaceScreen;
