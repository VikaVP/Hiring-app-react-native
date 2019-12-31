import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, Header, TouchableOpacity } from 'react-native'
import Menu from '../components/Menu'
import { withNavigation } from 'react-navigation'
import Profile from '../components/Profile'
const MyProfile = () => {
    const [hidden, setHidden] = useState(true);
    return (
        <View style={style.ListEngineers}>
            <ScrollView style={{ flex: 1, marginTop: -15 }}>
                <Profile />
            </ScrollView>
            <View style={style.MenuBar}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="home" title="Home" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="account-badge" title="Company List" />
                </TouchableOpacity >
                <TouchableOpacity onPress={() => {
                    navigate('MyProfile')
                }} style={{ flex: 1 }}>
                    <Menu iconName="account" title="Account" color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="logout" title="Sign Out" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MyProfile
const style = StyleSheet.create({
    ListEngineers: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 15
    },
    MenuBar: {
        height: 54,
        backgroundColor: 'white',
        flexDirection: 'row',
        bottom: 0

    },
    Bar: {
        height: 54,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: -20
    }
})