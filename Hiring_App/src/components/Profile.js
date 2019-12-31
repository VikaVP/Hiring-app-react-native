import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Left, List, ListItem, Body, Button, Item, Label, Input, Card, Form } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Foundation'
import { withNavigation } from 'react-navigation'
import Modal from "react-native-modal"
class Profile extends Component {
    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    render() {
        return (
            <>
                <View >
                    <ImageBackground source={require('../assets/bg.jpeg')} style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
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
                            shadowRadius: 2, elevation: 30
                        }}>
                            <Image source={require('../assets/aa.jpg')} style={style.image}>
                            </Image>
                        </View>
                    </ImageBackground>
                    <Card style={{
                        width: 320, marginTop: -40, marginLeft: 20, borderRadius: 20, shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2, elevation: 10
                    }}>
                        <View>
                            <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>LALALALA</Text>
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon name="account-badge" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>DOB        : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon name="email-open" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Email      : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icons name="address" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Location : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon name="anchor" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Showcase : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon name="briefcase-account" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Description : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon1 name="dollar-bill" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Expected Salary : ...</Text>
                                    </Body>
                                </ListItem>
                                <ListItem thumbnail>
                                    <Left>
                                        <Icon1 name="social-skillshare" size={30} color="blue" />
                                    </Left>
                                    <Body>
                                        <Text note numberOfLines={1}>Skill : ...</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </Card>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button primary style={style.button} title="Show modal" onPress={this.toggleModal}><Text style={style.textButton}> Edit </Text></Button>
                        <Button danger style={style.button}><Text style={style.textButton}> Delete </Text></Button>
                    </View>
                </View >
                <Modal isVisible={this.state.isModalVisible}>
                    <ScrollView>
                        <View style={{ backgroundColor: "white" }} >
                            <Form style={{ padding: 10 }}>
                                <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold' }}>EDIT PROFILE</Label>
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='id'
                                    name='id'
                                    className='form-control'
                                    value=" "
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='password'
                                    name='password'
                                    className='form-control'
                                    value=" "
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Date_created'
                                    name='Date_created'
                                    className='form-control'
                                    value=" "
                                />
                                <Item floatingLabel>
                                    <Label>Name</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Email</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>DOB</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Skill</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Location</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Showcase</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Description</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Expected Salary</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Photo</Label>
                                    <Input />
                                </Item>
                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                    <Button style={style.button} >
                                        <Text style={style.textButton}>SUBMIT</Text>
                                    </Button>
                                    <Button color="info" title="Hide modal" onPress={this.toggleModal} style={style.button} >
                                        <Text style={style.textButton}>CANCEL</Text>
                                    </Button>
                                </View>
                            </Form>
                        </View>
                    </ScrollView>
                </Modal>
            </>

        )
    }
}
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
export default withNavigation(Profile)