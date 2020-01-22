import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native'
import { Left, List, ListItem, Body, Card } from 'native-base'
import { Bubbles } from 'react-native-loader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo'
import { withNavigation } from 'react-navigation'
class DetailCompanies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // items: [],
            isLoading: false
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
        // const date = moment(posts.DOB.split('T')[0], 'YYYY-MM-DD').format('MMMM D YYYY')
        return (
            <View >
                {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> :
                    <>
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
                                <Image source={posts.Logo ? {
                                    uri: posts.Logo
                                } : { uri: `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg` }} style={style.image}>
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
                                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>{posts.Name}</Text>
                                <List>

                                    <ListItem thumbnail>
                                        <Left>
                                            <Icon name="email-open" size={30} color="blue" />
                                        </Left>
                                        <Body>
                                            <Text note numberOfLines={1}>Email      : {posts.email}</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Icons name="address" size={30} color="blue" />
                                        </Left>
                                        <Body>
                                            <Text note numberOfLines={2}>Location : {posts.Location}</Text>
                                        </Body>
                                    </ListItem>

                                    <ListItem thumbnail>
                                        <Left>
                                            <Icon name="briefcase-account" size={30} color="blue" />
                                        </Left>
                                        <Body>
                                            <Text note numberOfLines={2}>Description : {posts.Description}</Text>
                                        </Body>
                                    </ListItem>

                                </List>
                            </View>
                        </Card>
                    </>
                }
            </View >
        )
    }
}

export default withNavigation(DetailCompanies)
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

