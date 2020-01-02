import React, { Component } from 'react';
import { StyleSheet, Text, Field, TextInput, Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Card, View, Button } from 'native-base';
import { connect } from 'react-redux'
import { fetchSignup } from '../public/redux/actions/signup'
import { withNavigation } from 'react-navigation'
const regex = require('regex-email')
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            Name: "",
            email: "",
            password: "",
            nameErr: "",
            emailEr: "",
            passwordErr: "",
            role: "",
            valid: true,
            alert: null,
            roleErr: ""
        };
        this.addUser = this.addUser.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleFieldChangeFile = this.handleFieldChangeFile.bind(this)
    }
    validateForm() {
        const { Name, email, password, role } = this.state
        if (!email) {
            this.setState({
                emailErr: "Email must not be empty"
            });
        } else if (!email.match(regex)) {
            this.setState({
                emailErr: "Invalid email"
            })
        } else {
            this.setState({
                emailErr: ""
            });
        }
        if (!password) {
            this.setState({
                passwordErr: "Password must not be empty"
            });
        } else if (password.length < 3) {
            this.setState({
                passwordErr: "Password too short"
            })
        } else {
            this.setState({
                passwordErr: ""
            });
        }
        if (!Name) {
            this.setState({
                nameErr: "Name must not be empty"
            });
        } else {
            this.setState({
                nameErr: ""
            });
        }
        if (!role) {
            this.setState({
                roleErr: "Please choose your role"
            });
        } else {
            this.setState({
                roleErr: ""
            });
        }

    }
    addUser = () => {
        // e.preventDefault()
        // alert('hhh')
        // this.validateForm()
        // if (!this.state.emailErr && !this.state.passwordErr && !this.state.nameErr) {

        // alert(this.state.role)
        if (this.state.role === 'engineer') {
            this.props.fetchSignup('engineers', {
                Name: this.state.Name, email: this.state.email, password: this.state.password
            })
            Alert.alert(
                'Are you sure?',
                // `${this.state.Name} ${this.state.email} ${this.state.password}`,
                'Your data will be send',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Submit', onPress: () => this.props.navigation.navigate('Main') },
                ],
                { cancelable: false }
            )
        }
        if (this.state.role === 'company') {
            this.props.fetchSignup('companies', {
                Name: this.state.Name, email: this.state.email, password: this.state.password
            })
            Alert.alert(
                'Are you sure?',
                'Your data will be send',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Submit', onPress: () => { this.props.navigation.navigate('Main') } },
                ],
                { cancelable: false }
            )
        }
    }
    // }
    render() {
        return (
            <>
                <Header />
                <Container style={style.Login}>
                    <View >
                        <Card style={style.Card}>
                            <Form>
                                <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign Up</Label>
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Description'
                                    name='Description'
                                    className='form-control'
                                    value=" "
                                />
                                <TextInput style={{ display: 'none' }}
                                    type='hidden'
                                    id='Skill'
                                    name='Skill'
                                    className='form-control'
                                    value=" "
                                />
                                <TextInput style={{ display: 'none' }}
                                    type='hidden'
                                    id='Location'
                                    name='Location'
                                    className='form-control'
                                    value=" "
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Showcase'
                                    name='Showcase'
                                    className='form-control'
                                    value=" "
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='expected_salary'
                                    name='expected_salary'
                                    className='form-control'
                                    value=" "
                                />
                                <Item floatingLabel>
                                    <Label>Username</Label>
                                    <Input
                                        name="Name"
                                        value={this.state.Name}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Name: value
                                            })
                                        }} />
                                    {/* {this.state.nameErr && <Label style={{ color: "red" }}>
                                        {this.state.nameErr}
                                    </Label>} */}
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        value={this.state.email}
                                        onChangeText={(value) => {
                                            this.setState({
                                                email: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input
                                        name="password"
                                        value={this.state.password}
                                        onChangeText={(value) => {
                                            this.setState({
                                                password: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item picker style={{ width: 200, alignSelf: 'center', padding: 10 }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your role"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role}
                                        onValueChange={(value) => {
                                            this.setState({
                                                role: value
                                            })
                                        }}
                                    >
                                        <Picker.Item name="role" label="Role" />
                                        <Picker.Item name="role" label="Engineer" value="engineer" />
                                        <Picker.Item name="role" label="Company" value="company" />
                                    </Picker>
                                </Item>
                            </Form>
                            <Button full onPress={this.addUser}>
                                <Text style={{ color: "#ffffff" }} >Sign Up</Text>
                            </Button>
                        </Card>
                        <Text style={style.textSignUp}>Have any account? <Text onPress={() => this.props.navigation.push('Main')} style={{ fontWeight: 'bold' }}>Sign In</Text> in here </Text>
                    </View>
                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
    signup: state.signup
})

const mapDispatchToProps = dispatch => ({
    fetchSignup: (role, data) => dispatch(fetchSignup(role, data)),

})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignUp))
const style = StyleSheet.create({
    Login: {
        justifyContent: "center", flexGrow: 1, backgroundColor: "#00bcd4", alignItems: 'center'
    },
    Card: {
        width: 300
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})