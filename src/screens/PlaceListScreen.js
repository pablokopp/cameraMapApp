import {FlatList} from 'react-native';
import PlaceItem from '../components/PlaceItem/PlaceItem';
import React from 'react';
import {useSelector} from 'react-redux';

const PlaceListScreen = ({navigation}) => {
  const places = useSelector(state => state.places.places);

  const onSelectDetail = () => {
    navigation.navigate('Detalle');
  };

  const renderItem = ({item}) => {
    <PlaceItem
      title={item.title}
      image={item.image}
      adress="123 street, Pablovile"
      onSelect={onSelectDetail}
    />;
  };
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default PlaceListScreen;
