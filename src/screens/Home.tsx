import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SharedElement} from 'react-navigation-shared-element';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {RootStackParamList} from './types';
import {ProductType} from '../types';

import Link from '../components/Link';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState<ProductType[]>([]);

  const getData = async () => {
    try {
      const firestore_data: FirebaseFirestoreTypes.QuerySnapshot =
        await firestore().collection('products').get();
      const products: ProductType[] = [];
      firestore_data.forEach((product: FirebaseFirestoreTypes.DocumentData) => {
        products.push({id: product.id, ...product.data()});
      });
      setData(products);
    } catch {
      setError;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <Text>Error</Text>;
  }

  const renderItem = ({item}: {item: ProductType}) => {
    return (
      <>
        <SharedElement id={`item.${item.id}.image`}>
          <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
        </SharedElement>
        <View style={styles.item}>
          <View style={{justifyContent: 'center', marginHorizontal: 10}}>
            <Link
              text={item.name}
              onPress={() => navigation.navigate('Detail', item)}
            />
            <SharedElement id={`item.${item.id}.price`}>
              <Text>{item.price}</Text>
            </SharedElement>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
});

export default Home;
