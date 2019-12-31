import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Left, List, ListItem, Body, Button, Right, Thumbnail, Card } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Foundation'
import { withNavigation } from 'react-navigation'
import { CardFive } from 'react-native-card-ui'
class EngineersDetail extends Component {
    render() {
        return (
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
            </View >
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
    }
})
export default withNavigation(EngineersDetail)