import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Card, View, Button } from 'native-base';
export default class Login extends Component {
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
                                <Label style={{ fontSize: 30, textAlign: 'center' }}>Sign In</Label>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
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
                            <Button full onPress={() => this.props.navigation.navigate('Engineers')}>
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
const style = StyleSheet.create({
    Login: {
        justifyContent: "center", flexGrow: 1, backgroundColor: "#00bcd4"
    },
    Card: {
        marginLeft: 20,
        marginRight: 20,
        width: 300
    },
    textSignUp: {
        color: 'white',
        textAlign: 'center'
    }
})