import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../../../RootStackParams";

type screenProp = StackNavigationProp<RootStackParamList, 'AddCountry'>;

const AddCountry = () => {
    const navigation = useNavigation<screenProp>();
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Add Country Screen</Text>
        <Button title="Country List" onPress={() => navigation.navigate('CountryList')} />
      </View>
    )
}

export default AddCountry;
