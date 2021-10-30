import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Image} from 'react-native';

import {RootStackParamList} from './types';
import {ProductType} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail = ({route}: Props) => {
  const {name, price, image}: ProductType = route.params;
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={{uri: image}} style={{width: 300, height: 300}} />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
};

export default Detail;
