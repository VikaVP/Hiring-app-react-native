import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { CardFive } from 'react-native-card-ui'
// import { useNavigation } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Engineers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View >
                <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }} >LIST ENGINEERS</Text>
                {this.props.map((post, index) =>
                    <TouchableOpacity key={index} onPress={() => {
                        this.props.navigation.navigate('DetailEngineers')
                    }}>
                        <CardFive
                            title={post.Name}
                            subTitle={post.Skill}
                            profile={require('../assets/aa.jpg')}
                            image={require('../assets/aa.jpg')}
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
const style = StyleSheet.create({
    image: {
        height: undefined,
        width: undefined,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 8
    },
    wrapper: {
        height: 150,
        width: 150,
        borderRadius: 4,
        backgroundColor: "black"
    },
    list: {
        marginTop: 16,
        marginRight: 16
    },
    news: {
        fontWeight: 'bold',
        color: "black",
        textAlign: 'center',
        fontSize: 12
    }
})
export default withNavigation(Engineers)