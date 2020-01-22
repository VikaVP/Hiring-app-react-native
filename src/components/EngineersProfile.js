import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, Alert } from 'react-native'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Left, List, ListItem, Body, Button, Card } from 'native-base'
import { Bubbles } from 'react-native-loader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Foundation'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchDetailEngineers, fetchDeleteEngineers } from '../public/redux/actions/engineers'
import { withNavigation } from 'react-navigation'
class EngineersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            Name: '',
            Skill: '',
            DOB: '',
            expected_salary: '',
            Description: '',
            Showcase: '',
            email: '',
            Location: '',
            Date_created: '',
            Date_update: '',
            isModalVisible: false,
            Photo: null,
            show: false,
            nameErr: "",
            descriptionErr: "",
            emailErr: "",
            locationErr: "",
            photoErr: "",
            skillErr: '',
            DOBErr: '',
            expectedSalaryErr: '',
            showcaseErr: '',
            isLoading: false,
            date: new Date('2020-06-12T14:42:42'),
            show: false,
            mode: 'date',
        }
        this.delete = this.delete.bind(this)
    }
    delete() {
        this.props.fetchDelete(this.props.id)
        RNSecureStorage.remove("token")
        Alert.alert(
            'Are you sure?',
            'Click ok will delete your account',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () =>
                        // console.log(value)
                        this.props.navigation.navigate('Main')

                }
            ],
            { cancelable: false }
        )
    }

    componentDidMount() {
        this.props.fetch(this.props.id)
            .then(() => {
                this.props.propsDetail.detailEngineers.map((item) => {
                    return this.setState({
                        Name: item.Name,
                        id: item.id,
                        Skill: item.Skill,
                        Showcase: item.Showcase,
                        DOB: item.DOB.split('T')[0],
                        Description: item.Description,
                        email: item.email,
                        expected_salary: item.expected_salary,
                        Location: item.Location,
                        Date_created: item.Date_created.split('T')[0]
                    })
                })
            })
    }

    render() {
        const { isLoading } = this.state
        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );

        return (
            <>
                {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> :
                    this.props.propsDetail.detailEngineers.map((item, index) =>
                        <View >
                            <ImageBackground source={require('../assets/bg.jpeg')} style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.push('EditPhotoEngineers', {
                                        engineers: this.props.propsDetail.detailEngineers
                                    })
                                }} >
                                    <View style={{
                                        elevation: 100,
                                        position: 'relative'
                                    }}>
                                        <Icon2 name="photo-library" size={50} style={{ position: 'absolute', top: 80, left: 70, color: "white" }} />
                                    </View>

                                    <View style={{
                                        width: 200,
                                        height: 200,
                                        backgroundColor: "white",
                                        borderRadius: 500,
                                        borderWidth: 3,
                                        borderColor: "white",
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 5 },
                                        shadowOpacity: 1,
                                        shadowRadius: 2,
                                        // elevation: 30
                                    }}>
                                        <Image source={item.Photo ? {
                                            uri: item.Photo
                                        } : { uri: `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg` }}
                                            style={style.image}>
                                        </Image>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                            <Card style={{
                                width: 320, marginTop: -60, marginLeft: 20, borderRadius: 20, shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2, elevation: 10
                            }}>
                                <View>
                                    <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>{item.Name}</Text>
                                    <List>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="account-badge" size={30} color="blue" />
                                            </Left>
                                            <Body>

                                                <Text note numberOfLines={1}>DOB        : {
                                                    item.DOB ? moment(item.DOB.split('T')[0], 'YYYY-MM-DD').format('MMMM D YYYY') : ''

                                                }</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="email-open" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Email      : {item.email}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icons name="address" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Location : {item.Location}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="anchor" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Showcase : {item.Showcase}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="briefcase-account" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Description : {item.Description}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon1 name="dollar-bill" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Expected Salary : {item.expected_salary}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon1 name="social-skillshare" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Skill : {item.Skill}</Text>
                                            </Body>
                                        </ListItem>
                                    </List>
                                </View>
                            </Card>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button primary onPress={() => {
                                    this.props.navigation.push('EditEngineers', {
                                        engineers: this.props.propsDetail.detailEngineers
                                    })
                                }} style={{ flex: 1 }} style={style.button}><Text style={style.textButton}> Edit </Text></Button>
                                <Button onPress={this.delete} danger style={style.button}><Text style={style.textButton}> Delete </Text></Button>
                            </View>
                        </View >
                    )
                }
            </>

        )
    }
}
const mapStateToProps = state => ({
    propsDetail: state.engineers
})

const mapDispatchToProps = dispatch => ({
    fetch: id => dispatch(fetchDetailEngineers(id)),
    fetchDelete: id => dispatch(fetchDeleteEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EngineersProfile))
// export default withNavigation(Profile)
const style = StyleSheet.create({
    profile: {
        height: 200,
        width: 200,
        backgroundColor: "black",
        flex: 1,
        borderRadius: 50
    },
    image: {
        height: undefined,
        width: undefined,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 500
    },
    button: {
        width: 100, marginRight: 20, marginLeft: 20, borderRadius: 10
    },
    textButton: {
        color: "white",
        paddingLeft: 25,
        fontWeight: 'bold'
    }
})