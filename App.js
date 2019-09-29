import React, { memo } from 'react';
import moment from 'moment';

import { StyleSheet, Text, View, SectionList, SafeAreaView } from 'react-native';
import data from './mock-data/messages.json';
import Constants from 'expo-constants';

const SingleMessage = memo(({ item, index }) => {
  return (
    <React.Fragment>
      {
        item.is_mine ?  (
          <View style={styles.messageMine}>
            <View style={{ ...styles.messageText,  backgroundColor: '#1771F1', }}>
              <Text style={{color: '#fff'}}>{item.payload}</Text>
            </View>
            <Text style={{ color: '#000' }}>{moment(item.date).format('HH:MM a')}</Text>
          </View>
        )
        :(<View style={styles.messageSender}>
            <Text style={{ fontWeight: '700' }}>{item.first_name} {item.last_name}</Text>
            <View style={{ ...styles.messageText, backgroundColor: '#D7E1E9' }}>
              <Text style={{color: '#000'}}>{item.payload}</Text>
            </View>
            <Text style={{ color: '#000' }}>{moment(item.date).format('HH:MM a')}</Text>
        </View>)
      }
    </React.Fragment>
  )
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id; 
})


const transformData = (data) => {
  const groups = data.reduce((groups, message) => {
    const date = message.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      title: date,
      data: groups[date].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      })
    };
  });
  return groupArrays.sort((a, b) => {
    const dateA = new Date(a.title);
    const dateB = new Date(b.title);
    return dateB - dateA;
  });
  
}


const MessagesList = memo(() => {
  const renderItem = React.useCallback(({ item ,index}) => {
    return (
      <SingleMessage item={item} index={index} />
    )
  }, [formattedData])
  
  const formattedData = transformData(data);
  return (
    <SafeAreaView style={styles.messagesWrapper}>
      <SectionList
        sections={formattedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={100}
        stickySectionHeadersEnabled={false}
        invertStickyHeaders={true}
        removeClippedSubviews={true}
        style={{ flex: 1 }}
        inverted
        renderSectionFooter={({ section: { title } }) => (
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionBlock}>
              <Text style={{color: '#fff'}}>{title}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}, () => false)



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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  messagesWrapper: {
    flex: 1,
    width: '100%'
  },
  sectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  sectionBlock: {
    backgroundColor: '#5199FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  messageSender: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  messageMine: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  messageText: {
    padding: 10,
    borderRadius: 10,
    width: '80%'
  }
});
