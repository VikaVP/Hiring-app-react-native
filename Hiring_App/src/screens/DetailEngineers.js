import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, Header, TouchableOpacity } from 'react-native'
import Menu from '../components/Menu'
import { withNavigation } from 'react-navigation'
import EngineersDetail from '../components/EngineersDetail'
import { useNavigation } from 'react-navigation-hooks'
const DetailEngineers = () => {
    const [hidden, setHidden] = useState(true);
    const { navigate } = useNavigation()
    return (
        <View style={style.ListEngineers}>
            <ScrollView style={{ flex: 1, marginTop: -15 }}>
                <EngineersDetail />
            </ScrollView>
            <View style={style.MenuBar}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="home" title="Home" color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="account-badge" title="Company List" />
                </TouchableOpacity >
                <TouchableOpacity onPress={() => {
                    navigate('MyProfile')
                }} style={{ flex: 1 }}>
                    <Menu iconName="account" title="Account" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Menu iconName="logout" title="Sign Out" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default DetailEngineers
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