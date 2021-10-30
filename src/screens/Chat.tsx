import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const renderItem = ({item}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.user}>{item.user}</Text>
      <Text>{item.message}</Text>
    </View>
  );
};

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const _messages = [];
        snapshot.forEach(doc => {
          _messages.push({id: doc.id, ...doc.data()});
        });
        setMessages(_messages);
      });

    return unsubscribe;
  }, []);

  const onSubmit = async () => {
    await firestore()
      .collection('chats')
      .add({message: text, user: 'Zori', createdAt: new Date()});
    setText('');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={messages}
        inverted
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={onSubmit}
          style={{borderWidth: 1, flex: 1}}
        />
        <Pressable onPress={onSubmit} style={{marginLeft: 'auto'}}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'aquamarine',
    marginVertical: 5,
  },
  user: {
    backgroundColor: 'cyan',
    marginRight: 10,
  },
});
