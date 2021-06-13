import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SnapshotViewIOSBase,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../RootStackParams';
import {windowWidth} from '../../utils/dimension';
import firestore from '@react-native-firebase/firestore';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import Loader from '../custom-fields/loader';
import {GlobalContext} from '../context/global-state';

const AgencyList = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {
    agencyList,
    setAgencyList,
    showLoading,
    user,
    errorMessage,
    getAgencyList,
    deleteAgency,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getAgencyList();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {user && (
        <View>
          <Button
            onPress={() => {
              navigation.navigate('AddAgency');
            }}
            title="Add Agency"
            color="#6495ed"></Button>
        </View>
      )}

      {agencyList &&
        agencyList.map((item: any, i: number) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Agency Name: {item.name}</ListItem.Title>
              <View style={styles.footerWrapper}>
                {user && user.uid == item.userId && (
                  <>
                    <Button
                      onPress={() => {
                        navigation.navigate('AgencyUpdate', {id: item.id});
                      }}
                      title="Update"
                      color="#ff8c00"
                    />
                    <View style={{marginLeft: 10}}>
                      <Button
                        onPress={() => {
                          deleteAgency(item.id);
                        }}
                        title="Delete"
                        color="#ff0000"
                      />
                    </View>
                  </>
                )}
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => {
                      navigation.navigate('LocationDetails', {
                        id: item.locationId,
                      });
                    }}
                    title="View Location Details"
                    color="#87ceeb"
                  />
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      <Text>{showLoading}</Text>
      {showLoading && <Loader></Loader>}
    </ScrollView>
  );
};

export default AgencyList;

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: windowWidth,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  footerButton: {
    position: 'relative',
    marginLeft: 20,
  },
});
