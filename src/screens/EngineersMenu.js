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
import EngineersList from '../components/EngineersMenu'
import { connect } from 'react-redux'
import { fetchEngineers, fetchDetailEngineers } from '../public/redux/actions/engineers'

class EngineersMenu extends React.Component {
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
        this.handleOrderBy = this.handleOrderBy.bind(this)
        this.handleLimit = this.handleLimit.bind(this)
    }
    handleSort(value) {
        console.log(value);

        this.setState = {
            selected: value
        }
        this.props.fetch('', 1, 30, value, 'Name')
    }
    handleOrderBy(value) {
        this.setState = {
            selected: value
        }
        this.props.fetch('', 1, 30, 'DESC', value)
    }
    handleLimit(value) {
        this.setState = {
            selected: value
        }
        this.props.fetch('', 1, value, 'DESC', 'Name')
    }
    onSearch = (value) => {
        this.props.fetch(value, 1, 30, 'DESC', 'Name')
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
        this.props.fetch('', 1, 30, 'DESC', 'Name')

    }
    nextPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) + 1, 10, 'DESC', 'Name')
    }
    prevPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) - 1, 10, 'DESC', 'Name')
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

            <View style={style.ListEngineers} >
                <View style={{ marginBottom: 10, }}>
                    <Search name="engineersName"
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
                            onValueChange={(value) => { this.handleOrderBy(value) }}
                        >
                            <Picker.Item label="Sort By" value="Sort By" />
                            <Picker.Item label="Name" value="Name" />
                            <Picker.Item label="Skill" value="Skill" />
                            <Picker.Item label="Date Update" value="date_update" />
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
                    <EngineersList engineers={this.props.engineers.engineers} />
                </ScrollView>
                <View style={style.MenuBar}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('Companies')
                    }}>
                        <Menu iconName="home" title="Home" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.navigation.push('EngineersMenu')
                    }}>
                        <Menu iconName="account-badge" title="Engineers List" color="green" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('CompanyProfile', {
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
    engineers: state.engineers,
    engineer: state.detailEngineers
})

const mapDispatchToProps = dispatch => ({
    fetch: (search, page, limit, sort, sortBy) => dispatch(fetchEngineers(search, page, limit, sort, sortBy)),
    fetchDetail: id => dispatch(fetchDetailEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EngineersMenu))


// export default Engineers
const style = StyleSheet.create({
    ListEngineers: {
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