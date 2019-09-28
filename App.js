import React, { memo } from 'react';
import isEqual from 'lodash/isEqual'


import { StyleSheet, Text, View, FlatList } from 'react-native';
import data from './mock-data/messages.json';

const SingleMessage = memo(({ item }) => {
  return (
    <Text style={{ marginTop: 20, flex: 1 }}>{item.first_name}{item.last_name}</Text>
  )
}, (prevProps,nextProps) => isEqual(prevProps, nextProps))


const MessagesList = memo(() => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <SingleMessage item={item} />
      )}
      keyExtractor={item => item.id}
      initialNumToRender={50}
      maxToRenderPerBatch={100}
      windowSize={20}
    />
  )
})



export default function App() {
  return (
    <View style={styles.container}>
      <MessagesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
