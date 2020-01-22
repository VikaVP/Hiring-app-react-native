import React, { Component, Fragment } from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik'
import { StyleSheet, Text, TextInput, Alert } from 'react-native'
import { Container, Header, Item, Input, Label, Picker, Icon, Card, View, Button } from 'native-base';
import { connect } from 'react-redux'
import { fetchSignup } from '../public/redux/actions/signup'
import { withNavigation } from 'react-navigation'
import PasswordInputText from 'react-native-hide-show-password-input'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DOB: "1999-12-1"
        };
        this.addUser = this.addUser.bind(this)
    }
    addUser = (v) => {
        if (v['role'] === 'engineer') {
            this.props.fetchSignup('engineers', {
                Name: v['Name'], email: v['email'], password: v['password'], DOB: this.state.DOB
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
                    { text: 'Submit', onPress: () => this.props.navigation.navigate('Main') },
                ],
                { cancelable: false }
            )
        }
        if (v['role'] === 'company') {
            this.props.fetchSignup('companies', {
                Name: v['Name'], email: v['email'], password: v['password']
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

            <Formik
                initialValues={{ email: '', password: '', role: '', Name: '' }}
                onSubmit={values => this.addUser(values)}
                validationSchema={Yup.object().shape({
                    role: Yup.string()
                        .label('role')
                        .required()
                        .min(2, 'Must have choose one'),
                    Name: Yup.string()
                        .label('Name')
                        .required()
                        .max(40, 'Max 40 characters'),
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
                                    <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign Up</Label>
                                    <Input style={{ display: 'none' }}
                                        type='hidden'
                                        id='DOB'
                                        name='DOB'
                                        className='form-control'
                                        value="1999-12-1"
                                    />
                                    <TextInput
                                        value={values.Name}
                                        onChangeText={handleChange('Name')}
                                        onBlur={() => setFieldTouched('Name')}
                                        placeholder="Name"
                                    />
                                    {touched.Name && errors.Name &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.Name}</Text>
                                    }
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
                                        <Text style={{ color: "#ffffff" }} >Sign Up</Text>
                                    </Button>
                                </Card>
                                <Text style={style.textSignUp}>Have any account? <Text onPress={() => this.props.navigation.push('Main')} style={{ fontWeight: 'bold' }}>Sign In</Text> in here </Text>
                            </View>
                        </Container>
                    </Fragment>
                )}
            </Formik>

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
        width: 300,
        padding: 20
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})