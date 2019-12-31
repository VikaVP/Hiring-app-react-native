import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { Bubbles } from 'react-native-loader'
// import { createStackNavigator, createAppContainer } from 'react-navigation';

const Splash = () => {

    const { navigate } = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigate('Main')
        }, 3000)
    });
    return (
        <View style={style.Container}>
            <Image style={style.Logo} source={require('../assets/arkademy.png')} />
            <Text>Hiring Channel</Text>
            <Bubbles size={10} color="#FFF" />
        </View>
    )
}
export default Splash

const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#DEAA9B",
        justifyContent: "center",
        alignItems: "center"
    },
    Logo: {
        width: 120,
        height: 50
    }
})