import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, Header, TouchableOpacity, Alert } from 'react-native'
import Menu from '../components/Menu'
import jwtDecode from 'jwt-decode'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { withNavigation } from 'react-navigation'
import EditEngineers from '../components/EditEngineers'
class EditEngineer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            id: ''
        }
    }
    componentDidMount() {
        let token
        let decoded
        RNSecureStorage.get("token").then((value) => {
            console.log(value) // Will return direct value
            token = value
            decoded = jwtDecode(token)
            console.log(decoded);
            this.setState({
                id: decoded["dataId"]
            })
        }).catch((err) => {
            console.log(err)
        })

    }
    getLogout = () => {

        RNSecureStorage.remove("token")
        Alert.alert(
            'Are you sure?',
            'Click ok will sign out your account',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () =>
                        // console.log(value)
                        this.props.navigation.push('Main')

                }
            ],
            { cancelable: false }
        )

    }
    render() {
        const engineers = this.props.navigation.getParam('engineers', {});
        return (
            <View style={style.ListEngineers}>
                <ScrollView style={{ flex: 1, marginTop: -15 }}>
                    <EditEngineers prop={engineers} />
                </ScrollView>
                <View style={style.MenuBar}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('Engineers')
                    }} style={{ flex: 1 }}>
                        <Menu iconName="home" title="Home" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('CompaniesMenu')
                    }}>
                        <Menu iconName="account-badge" title="Company List" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('MyProfile', {
                            id: this.state.id
                        })
                    }} style={{ flex: 1 }} >
                        <Menu iconName="account" title="Account" color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={this.getLogout}>
                        <Menu iconName="logout" title="Sign Out" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default withNavigation(EditEngineer)
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