import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { CardFive } from 'react-native-card-ui'
import { Bubbles } from 'react-native-loader'
class EngineersMenu extends Component {
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
                            this.props.navigation.navigate('DetailEngineersOfCompany', {
                                engineers: post
                            })
                        }}>
                            <CardFive
                                title={post.Name}
                                subTitle={
                                    `Skill :${post.Skill}   Expected Salary: ${post.expected_salary}`
                                }
                                profile={post.Photo ? {
                                    uri: post.Photo
                                } : { uri: `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg` }}
                                image={post.Photo ? {
                                    uri: post.Photo
                                } : { uri: `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg` }}
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

export default withNavigation(EngineersMenu)