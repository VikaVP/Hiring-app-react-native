import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { CardFive } from 'react-native-card-ui'
import { Bubbles } from 'react-native-loader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Engineers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }

    }
    render() {
        const { isLoading } = this.state

        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );
        return (
            <View style={{ alignItems: 'center' }} >
                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }} >LIST ENGINEERS</Text>
                {!isLoading ? <Bubbles size={10} style={{ marginTop: 300 }} color="#FFF" /> :
                    this.props.engineers.map((post, index) =>
                        <TouchableOpacity key={index} onPress={() => {
                            this.props.navigation.navigate('DetailEngineers', {
                                engineers: post
                            })
                        }}>
                            <CardFive
                                title={post.Name}
                                subTitle={
                                    `Skill :${post.Skill}   Expected Salary: ${post.expected_salary}`
                                }
                                profile={{
                                    uri: `${post.Photo}`
                                }}
                                image={{
                                    uri: `${post.Photo}`
                                }}
                                icon={"star"}
                                nbStar={6}
                                iconColor={"#FFC57C"}

                            />
                        </TouchableOpacity>
                    )}
            </View>
        )
    }
}

export default withNavigation(Engineers)