import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Picker } from 'native-base'
import { useNavigation } from 'react-navigation-hooks'
// import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../components/Search'
import Menu from '../components/Menu'
import Sliders from '../components/Sliders'
import EngineersList from '../components/Engineers'
import { connect } from 'react-redux'
import { fetchEngineers, fetchDetailEngineers } from '../public/redux/actions/engineers'
const Engineers = (props) => {
    // const [hidden, setHidden] = useState(true);
    const { navigate } = useNavigation()
    const { engineers, setEngineers } = useState([])
    const { engineersName, setEngineersName } = useState('')
    const { isLoading } = useState(false)
    const { id, setId } = useState('')
    const { username, setUsername } = useState('')

    const handleSort = (value) => {
        this.props.fetch('', 1, 10, value, 'Name')
    }
    const handleOrderBy = (value) => {
        this.props.fetch('', 1, 10, 'DESC', value)
    }
    const handleLimit = (value) => {
        this.props.fetch('', 1, value, 'DESC', 'Name')
    }
    const onSearch = e => {
        const val = e.target.value
        console.log(e.target.value);
        this.props.fetch(val, 1, 10, 'DESC', 'Name')
    }
    useEffect(() => {
        // const token = localStorage.getItem("token")
        // const decoded = jwtDecode(token)
        // console.log(decoded);
        // this.setState({
        //     id: decoded.dataId
        // })
        // this.props.fetchDetail(decoded.dataId).then(() => {
        //     this.props.engineer.detailEngineers.map((item) => {
        //         return this.setState({
        //             username: item.Name
        //         })
        //     })
        // })
        this.props.fetch('', 1, 10, 'DESC', 'Name')
    })
    nextPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) + 1, 10, 'DESC', 'Name')
    }
    prevPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) - 1, 10, 'DESC', 'Name')
    }
    getLogout = () => {

        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem('token')
                    this.props.history.push('/')
                }
            })

    }
    return (

        <View style={style.ListEngineers}>
            <View >
                <Search name="engineersName"
                    onChange={onSearch} />
            </View>
            <ScrollView>
                <Sliders style={{ flex: 1, marginTop: 20 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 16, marginRight: 16, marginTop: -10, marginBottom: 10 }}>
                    <Picker
                        label="Sort"
                        mode="dropdown"
                        placeholder="Sort"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Sort"
                        textStyle={{ color: "#5cb85c" }}
                        itemStyle={{
                            backgroundColor: "#d3d3d3",
                            marginLeft: 0,
                            paddingLeft: 10
                        }}
                        itemTextStyle={{ color: '#788ad2' }}
                        style={{ width: undefined }}

                    //   selectedValue={this.state.selected}
                    //   onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Name [A-Z]" value="key0" onPress={() => handleSort("ASC")} />
                        <Picker.Item label="Name [Z-A]" value="key1" onPress={() => handleSort("DESC")} />
                    </Picker>
                    <Picker
                        mode="dropdown"
                        placeholder="Sort By"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Sort By"
                        textStyle={{ color: "#5cb85c" }}
                        itemStyle={{
                            backgroundColor: "#d3d3d3",
                            marginLeft: 0,
                            paddingLeft: 10
                        }}
                        itemTextStyle={{ color: '#788ad2' }}
                        style={{ width: undefined }}
                    //   selectedValue={this.state.selected}
                    //   onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Name" value="key0" onPress={() => handleOrderBy("Name")} />
                        <Picker.Item label="Skill" value="key1" onPress={() => handleOrderBy("Skill")} />
                        <Picker.Item label="Date Update" value="key1" onPress={() => handleOrderBy("date_update")} />
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
                    //   selectedValue={this.state.selected}
                    //   onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="5" value="key0" onPress={() => handleLimit("5")} />
                        <Picker.Item label="10" value="key1" onPress={() => handleLimit("10")} />
                    </Picker>
                </View>
                <EngineersList engineers={this.props.engineers.engineers} />
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
                    <Menu iconName="logout" title="Sign Out" onPress={getLogout} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const mapStateToProps = state => ({
    engineers: state.engineers,
    engineer: state.detailEngineers
})

const mapDispatchToProps = dispatch => ({
    fetch: (search, page, limit, sort, sortBy) => dispatch(fetchEngineers(search, page, limit, sort, sortBy)),
    fetchDetail: id => dispatch(fetchDetailEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Engineers)


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