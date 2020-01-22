import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native'
import jwtDecode from 'jwt-decode'
import RNSecureStorage from 'rn-secure-storage'
import { Button, Item, Label, Input, Form } from 'native-base'
import { Bubbles } from 'react-native-loader'
import { connect } from 'react-redux'
import { fetchUpdateCompanies, fetchDetailCompanies } from '../public/redux/actions/companies'
import { withNavigation } from 'react-navigation'
class EditCompanies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            Name: '',
            Description: '',
            email: '',
            Location: '',
            password: '',
            isModalVisible: false,
            Logo: null,
            show: false,
            isLoading: false
        }
        this.editData = this.editData.bind(this)
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
        const posts = this.props.prop
        posts.map((item) => {
            return this.setState({
                Name: item.Name,
                id: item.id,
                Description: item.Description,
                email: item.email,
                Location: item.Location,
                Logo: item.Logo
            })
        })
    }

    editData() {
        const { Name, email, Location, Description } = this.state
        if (Name && email && Location && Description) {
            const formData = new FormData()
            formData.append('id', this.state.id)
            formData.append('email', this.state.email)
            formData.append('Name', this.state.Name)
            formData.append('Logo', this.state.Logo)
            formData.append('Description', this.state.Description)
            formData.append('Location', this.state.Location)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; boundary=' + formData._boundary
                }
            }
            this.props.fetchUpdate(this.state.id, formData, config)
            console.log(formData);

            Alert.alert(
                'Are you sure?',
                'Your profile will be change',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => this.props.navigation.push('CompanyProfile', {
                            id: this.state.id
                        })
                    },
                ],
                { cancelable: false }
            )
        } else {
            alert('all data must be fulfilled')
        }
    }
    render() {
        const { isLoading } = this.state
        const posts = this.props.prop
        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );
        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: "white" }} >
                        {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> : posts.map((post, index) =>
                            <Form style={{ padding: 10 }} >
                                <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold' }}>EDIT COMPANIES</Label>
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='id'
                                    name='id'
                                    className='form-control'
                                    value={post.id}
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='password'
                                    name='password'
                                    className='form-control'
                                    value={post.password}
                                    onChangeText={(value) => {
                                        this.setState({
                                            password: value
                                        })
                                    }}
                                />

                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Logo'
                                    name='Logo'
                                    className='form-control'
                                    value={post.Logo}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Logo: value
                                        })
                                    }}
                                />

                                <Item stackedLabel>
                                    <Label>Name</Label>
                                    <Input
                                        type='text'
                                        id='Name'
                                        name='Name'
                                        value={post.Name}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Name: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Email</Label>
                                    <Input
                                        type='text'
                                        id='email'
                                        name='email'
                                        value={post.email}
                                        onChangeText={(value) => {
                                            this.setState({
                                                email: value
                                            })
                                        }}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Location</Label>
                                    <Input
                                        type='text'
                                        id='Location'
                                        name="Location"
                                        value={post.Location}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Location: value
                                            })
                                        }}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Description</Label>
                                    <Input
                                        type='text'
                                        id='Description'
                                        name="Description"
                                        value={post.Description}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Description: value
                                            })
                                        }}
                                    />
                                </Item>

                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                    <Button style={style.button} onPress={this.editData}>
                                        <Text style={style.textButton}>SUBMIT</Text>
                                    </Button>
                                    <Button color="info" style={style.button} onPress={() => {
                                        this.props.navigation.push('CompanyProfile', {
                                            id: this.state.id
                                        })
                                    }}>
                                        <Text style={style.textButton}>CANCEL</Text>
                                    </Button>
                                </View>

                            </Form>
                        )}
                    </View>
                </ScrollView>
            </>

        )
    }
}
const mapStateToProps = state => ({
    propsDetail: state.companies
})

const mapDispatchToProps = dispatch => ({
    fetch: id => dispatch(fetchDetailCompanies(id)),
    fetchUpdate: (id, data, config) => dispatch(fetchUpdateCompanies(id, data, config))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditCompanies))
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
