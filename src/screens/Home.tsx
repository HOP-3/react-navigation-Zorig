import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

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
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
        <View style={{justifyContent: 'center', marginHorizontal: 10}}>
          <Link
            text={item.name}
            onPress={() => navigation.navigate('Detail', item)}
          />
          <Text>{item.price}</Text>
        </View>
      </View>
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
