import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Search = (props) => {
    return (
        <View style={style.SearchBar}>
            <TextInput onChangeText={props.onChangeText} placeholder="Type here for search" ></TextInput>
            <Icon name="account-search" size={30} color="#194d33" style={style.icon} />
        </View>
    )
}
const style = StyleSheet.create({
    SearchBar: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        height: 40,
        fontSize: 13,
        paddingLeft: 45,
        paddingRight: 20,
        backgroundColor: "white",
        marginHorizontal: 17
    },
    icon: {
        position: 'absolute',
        left: 12
    }
})
export default Search