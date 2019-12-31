import React, { Component } from 'react';
import { StyleSheet, Text, Field, TextInput } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Card, View, Button } from 'native-base';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined
        };
    }
    onValueChange2(value: String) {
        this.setState({
            selected2: value
        });
    }
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
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Email</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Photo/Logo</Label>
                                    <Input />
                                </Item>
                                <Item picker style={{ width: 200, alignSelf: 'center', padding: 10 }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your role"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}
                                    >
                                        <Picker.Item label="Engineer" value="key0" />
                                        <Picker.Item label="Company" value="key1" />
                                    </Picker>
                                </Item>
                            </Form>
                            <Button full>
                                <Text style={{ color: "#ffffff" }}>Sign Up</Text>
                            </Button>
                        </Card>
                        <Text style={style.textSignUp}>Have any account? <Text onPress={() => this.props.navigation.navigate('Main')} style={{ fontWeight: 'bold' }}>Sign In</Text> in here </Text>
                    </View>
                </Container>
            </>
        );
    }
}
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