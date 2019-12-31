import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Menu = (props) => {
    const colors = props.color ? props.color : '#92999f'
    return (
        // <View style={style.MenuBar}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={props.iconName} size={30} color={colors} style={style.icon} />
            <Text style={{ color: "#92999f", marginTop: 4, fontSize: 10 }}>{props.title}</Text>
        </View>
        // </View>
    )
}
const style = StyleSheet.create({
    MenuBar: {
        height: 54,
        backgroundColor: 'white',
        flexDirection: 'row'
    }
})
export default Menu