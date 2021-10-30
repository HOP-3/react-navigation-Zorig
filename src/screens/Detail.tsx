import React from 'react';
import {View, Text, Image, Animated} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SharedElement} from 'react-navigation-shared-element';

import {RootStackParamList} from './types';
import {ProductType} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail = ({route}: Props) => {
  const {name, price, image, id}: ProductType = route.params;
  const position = new Animated.Value(0);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <SharedElement id={`item.${id}.image`}>
        <Image source={{uri: image}} style={{width: 300, height: 300}} />
      </SharedElement>

      <SharedElement id={`item.${id}.name`}>
        <Text>{name}</Text>
      </SharedElement>
      <Text>{price}</Text>
    </View>
  );
};

Detail.sharedElements = route => {
  const {id} = route.params;
  return [
    {
      id: `item.${id}.image`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default Detail;
