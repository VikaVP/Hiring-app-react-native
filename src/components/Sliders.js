import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { CardFour } from 'react-native-card-ui'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Menu = (props) => {
    return (
        <ScrollView horizontal={true} >
            <View style={{ flexDirection: 'row' }}>
                <CardFour
                    onClicked={() => {
                        alert("Visit blog now");
                    }}
                    image={require('../assets/ab.jpg')}
                    date={"31 December 2019"}
                    off={"-25%"}
                    offText={
                        "How to strengthen teamwork? This book give some tips for your teamwork in here"
                    }
                    buttonText={"NOW!"}
                />
                <CardFour
                    onClicked={() => {
                        alert("Visit blog now");
                    }}
                    image={require('../assets/aa.jpg')}
                    date={"31 December 2019"}
                    off={"$10"}
                    offText={
                        "Sometimes you gotta be bored about work with the same task everyday. This book will give you spirit"
                    }
                    buttonText={"NOW!"}
                />
                <CardFour
                    onClicked={() => {
                        alert("Visit blog now");
                    }}
                    image={require('../assets/abc.jpeg')}
                    date={"31 December 2019"}
                    off={"$8"}
                    offText={
                        "You maybe find out who your true bestfriend in here"
                    }
                    buttonText={"NOW!"}
                />
                <CardFour
                    onClicked={() => {
                        alert("Visit blog now");
                    }}
                    image={require('../assets/acc.jpeg')}
                    date={"31 December 2019"}
                    off={"$12"}
                    offText={
                        "10 Ways to achive your goals in 2020. Wanna now?"
                    }
                    buttonText={"NOW!"}
                />
                <CardFour
                    onClicked={() => {
                        alert("Visit blog now");
                    }}
                    image={require('../assets/aaa.jpg')}
                    date={"31 December 2019"}
                    off={"-10%"}
                    offText={
                        "How you manage your teamwork? This is some valuable thing you must know being leader"
                    }
                    buttonText={"NOW!"}
                />
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    image: {
        height: undefined,
        width: undefined,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 8
    },
    wrapper: {
        height: 150,
        width: 150,
        borderRadius: 4,
        backgroundColor: "black"
    },
    row: {
        marginTop: 16,
        marginRight: 16
    },
    news: {
        fontWeight: 'bold',
        color: "black",
        textAlign: 'center',
        fontSize: 12
    }
})
export default Menu