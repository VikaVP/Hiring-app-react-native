import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Menu from '../components/Menu'
import jwtDecode from 'jwt-decode'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { withNavigation } from 'react-navigation'
import EditCompany from '../components/EditCompanies'
class EditCompanies extends React.Component {
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
        const companies = this.props.navigation.getParam('companies', {});
        return (
            <View style={style.ListCompanies}>
                <ScrollView style={{ flex: 1, marginTop: -15 }}>
                    <EditCompany prop={companies} />
                </ScrollView>
                <View style={style.MenuBar}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('Companies')
                    }} style={{ flex: 1 }}>
                        <Menu iconName="home" title="Home" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('EngineersMenu')
                    }}>
                        <Menu iconName="account-badge" title="Engineers List" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('CompanyProfile', {
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
export default withNavigation(EditCompanies)
const style = StyleSheet.create({
    ListCompanies: {
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