import React from 'react'
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Button, Picker } from 'native-base'
import { withNavigation } from 'react-navigation'
import jwtDecode from 'jwt-decode'
import RNSecureStorage from 'rn-secure-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../components/Search'
import Menu from '../components/Menu'
import Sliders from '../components/Sliders'
import CompaniesList from '../components/CompanyMenu'
import { connect } from 'react-redux'
import { fetchCompanies, fetchDetailCompanies } from '../public/redux/actions/companies'

class CompaniesMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            id: '',
            username: '',
            selected: ''
        }
        this.getLogout = this.getLogout.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleLimit = this.handleLimit.bind(this)
    }
    handleSort(value) {
        console.log(value);

        this.setState = {
            selected: value
        }
        this.props.fetch('', 1, 10, value, 'Name')
    }
    handleLimit(value) {
        this.setState = {
            selected: value
        }
        this.props.fetch('', 1, value, 'DESC', 'Name')
    }
    onSearch = (value) => {
        this.props.fetch(value, 1, 10, 'DESC', 'Name')
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
        this.props.fetch('', 1, 10, 'DESC', 'Name')

    }
    nextPage = () => {
        this.props.fetch('', parseInt(this.props.companies.page.page) + 1, 10, 'DESC', 'Name')
    }
    prevPage = () => {
        this.props.fetch('', parseInt(this.props.companies.page.page) - 1, 10, 'DESC', 'Name')
    }
    getLogout() {

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
        return (

            <View style={style.ListCompanies} >
                <View style={{ marginBottom: 10, }}>
                    <Search name="companiesName"
                        onChangeText={text => { this.onSearch(text) }} />
                </View>
                <ScrollView>
                    <Sliders style={{ flex: 1, marginTop: 20 }} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 16, marginRight: 16, marginTop: -10, marginBottom: 10 }}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            textStyle={{ color: "#5cb85c" }}
                            itemStyle={{
                                backgroundColor: "#d3d3d3",
                                marginLeft: 0,
                                paddingLeft: 10
                            }}
                            itemTextStyle={{ color: '#788ad2' }}
                            style={{ width: undefined }}

                            selectedValue={this.state.selected}
                            onValueChange={(value) => { this.handleSort(value) }}
                        >
                            <Picker.Item label="Sort" value="DESC" />
                            <Picker.Item label="Name [Z-A]" value="DESC" />
                            <Picker.Item label="Name [A-Z]" value="ASC" />
                        </Picker>

                        <Picker
                            mode="dropdown"
                            placeholder="Limit"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Limit"
                            textStyle={{ color: "#5cb85c" }}
                            itemStyle={{
                                backgroundColor: "#d3d3d3",
                                marginLeft: 0,
                                paddingLeft: 10
                            }}
                            itemTextStyle={{ color: '#788ad2' }}
                            style={{ width: undefined }}
                            selectedValue={this.state.selected}
                            onValueChange={(value) => { this.handleLimit(value) }}
                        >
                            <Picker.Item label="Limit" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="10" value="10" />
                        </Picker>
                    </View>
                    <CompaniesList companies={this.props.companies.companies} />
                </ScrollView>
                <View style={style.MenuBar}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('Engineers')
                    }}>
                        <Menu iconName="home" title="Home" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('CompaniesMenu')
                    }}>
                        <Menu iconName="account-badge" title="Companies List" color="green" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('MyProfile', {
                            id: this.state.id
                        })
                    }} style={{ flex: 1 }}>
                        <Menu iconName="account" title="Account" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={this.getLogout}>
                        <Menu iconName="logout" title="Sign Out" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
const mapStateToProps = state => ({
    companies: state.companies,
    company: state.detailCompanies
})

const mapDispatchToProps = dispatch => ({
    fetch: (search, page, limit, sort, sortBy) => dispatch(fetchCompanies(search, page, limit, sort, sortBy)),
    fetchDetail: id => dispatch(fetchDetailCompanies(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CompaniesMenu))


// export default Engineers
const style = StyleSheet.create({
    ListCompanies: {
        flex: 1,
        backgroundColor: "#c4def6",
        paddingTop: 15
    },
    MenuBar: {
        height: 54,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    news: {
        fontWeight: 'bold',
        color: "blue"
    },
    button: {
        width: 100,
        marginRight: 10
    },
    buttonText: {
        alignSelf: 'center',
        marginLeft: 30,
        color: "white"
    }
})