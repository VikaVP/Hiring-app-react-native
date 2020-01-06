import * as Yup from 'yup'
import { Formik } from 'formik'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { fetchLogin } from '../public/redux/actions/login'
import { connect } from 'react-redux'
import { Item, Picker, Icon, Button, Card, Header, Container, Label } from 'native-base';
import { withNavigation } from 'react-navigation';
import React, { Component, Fragment } from 'react';
import { TextInput, Text, Alert, StyleSheet, View } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input'
class Login extends Component {
    constructor(props) {
        super(props);
    }
    getLogin = (v) => {
        if (v['role'] === 'engineer') {
            this.props.loginUser(v).then(() => {
                RNSecureStorage.set("token", this.props.login.token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                    .then((res) => {
                        console.log(res);
                        Alert.alert(
                            'Welcome',
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
            }, (err) => {
                console.log(err);
                alert('You enter the wrong email and password, please try again!')
            });
        }
        if (v['role'] === 'company') {
            this.props.loginUser(v).then(() => {
                RNSecureStorage.set("token", this.props.login.token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                    .then((res) => {
                        console.log(res);
                        Alert.alert(
                            'Welcome',
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
            }, (err) => {
                console.log(err);
                alert('You enter the wrong email and password, please try again!')
            });
        }
    }
    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '', role: '' }}
                onSubmit={values => this.getLogin(values)}
                validationSchema={Yup.object().shape({
                    role: Yup.string()
                        .label('role')
                        .required()
                        .min(2, 'Must have choose one'),
                    email: Yup.string()
                        .label('email')
                        .email('Enter a valid email')
                        .required('Please enter a registered email'),
                    password: Yup.string()
                        .label('password')
                        .required()
                        .min(3, 'Password must have more than 3 characters '),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, setFieldValue, handleSubmit }) => (
                    <Fragment>
                        <Header />
                        <Container style={style.Login}>
                            <View >
                                <Card style={style.Card}>
                                    <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign In</Label>

                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        placeholder="E-mail"
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    }
                                    <PasswordInputText
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        secureTextEntry={true}
                                    />
                                    {touched.password && errors.password &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    }
                                    <Item picker style={{ width: 200, alignSelf: 'center', padding: 10 }}>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined }}
                                            placeholder="Select your role"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={values.role}
                                            onBlur={() => setFieldTouched('role')}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setFieldValue('role', itemValue)
                                                this.setState({ role: itemValue })
                                            }}
                                        >
                                            <Picker.Item name="role" label="role" />
                                            <Picker.Item name="engineer" label="engineer" value="engineer" />
                                            <Picker.Item name="company" label="company" value="company" />
                                        </Picker>
                                    </Item>
                                    {touched.role && errors.role &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.role}</Text>
                                    }
                                    <Button full title='Sign In'
                                        disabled={!isValid} onPress={handleSubmit} >
                                        <Text style={{ color: "#ffffff" }} >Sign In</Text>
                                    </Button>
                                </Card>
                                <Text style={style.textSignUp}>Dont have any account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{ fontWeight: 'bold' }}>Sign Up</Text> in here </Text>
                            </View>
                        </Container>
                    </Fragment>
                )}
            </Formik>
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
        width: 300,
        padding: 20
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})