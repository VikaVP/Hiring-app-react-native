import React, { Component } from 'react';
import { StyleSheet, Text, Alert } from 'react-native'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { fetchLogin } from '../public/redux/actions/login'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Card, View, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            email: "",
            password: "",
            role: "",
            emailErr: "",
            passwordErr: "",
            roleErr: ""
        };
    }
    validateForm() {
        const { email, password, role } = this.state
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

    getLogin = () => {

        // event.preventDefault();
        const { email, password, role } = this.state
        const data = {
            email, password, role
        }
        // this.validateForm()
        // if (!this.state.emailErr && !this.state.passwordErr) {
        if (this.state.role === 'engineer') {
            this.props.loginUser(data).then(() => {
                RNSecureStorage.set("token", this.props.login.token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                // .then((res) => {
                //     console.log(res);
                // }, (err) => {
                //     console.log(err);
                // });
                // localStorage.setItem("token", this.props.login.token)
                Alert.alert(
                    'Welcome',
                    // `${this.state.Name} ${this.state.email} ${this.state.password}`,
                    'You will be direct to your account',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'Ok', onPress: () => this.props.navigation.navigate('Engineers') }
                    ],
                    { cancelable: false }
                )
            })
        }
        if (this.state.role === 'companies') {
            this.props.loginUser(data).then(() => {
                localStorage.setItem("token", this.props.login.token)
                Alert.alert(
                    'Welcome',
                    // `${this.state.Name} ${this.state.email} ${this.state.password}`,
                    'You will be direct to your account',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'Ok', onPress: () => this.props.navigation.navigate('Companies') }
                    ],
                    { cancelable: false }
                )
            })
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
                                <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign In</Label>
                                <Item floatingLabel>
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
                                        }} />
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
                            <Button full onPress={this.getLogin}>
                                <Text style={{ color: "#ffffff" }} >Sign In</Text>
                            </Button>
                        </Card>
                        <Text style={style.textSignUp}>Dont have any account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{ fontWeight: 'bold' }}>Sign Up</Text> in here </Text>
                    </View>
                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(fetchLogin(data)),

})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Login))
const style = StyleSheet.create({
    Login: {
        justifyContent: "center", flexGrow: 1, backgroundColor: "#00bcd4"
    },
    Card: {
        marginLeft: 30,
        width: 300
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})