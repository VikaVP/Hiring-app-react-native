import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView, Alert } from 'react-native'
import jwtDecode from 'jwt-decode'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Item, Label, Input, Card, Form } from 'native-base'
import { Bubbles } from 'react-native-loader'
import ImagePicker from 'react-native-image-picker';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchUpdateEngineers, fetchDetailEngineers } from '../public/redux/actions/engineers'
import { withNavigation } from 'react-navigation'

class EditPhotoEngineers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenDate: new Date(),
            type: '',
            data: null,
            id: '',
            Name: '',
            Skill: '',
            DOB: '',
            expected_salary: '',
            Description: '',
            Showcase: '',
            email: '',
            Location: '',
            Date_created: '',
            password: '',
            Date_update: '',
            isLoading: false,
            isSelectedPhoto: 0,
            uri: '',
            fileName: '',
            photoErr: '',
            photoErr2: ''

        }
        this.editData = this.editData.bind(this)
    }

    componentDidMount() {
        let token
        let decoded
        RNSecureStorage.get("token").then((value) => {
            token = value
            decoded = jwtDecode(token)
            this.setState({
                id: decoded["dataId"]
            })
        }).catch((err) => {
            console.log(err)
        })
        const posts = this.props.prop
        posts.map((item) => {
            return this.setState({
                Name: item.Name,
                id: item.id,
                Skill: item.Skill,
                Showcase: item.Showcase,
                DOB: item.DOB,
                Description: item.Description,
                email: item.email,
                expected_salary: item.expected_salary,
                Location: item.Location,
                Date_created: item.Date_created.split('T')[0],
                Photo: item.Photo == null ?
                    `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg`:
                    item.Photo
            })
        })

    }
    refresh = () => {
        let token
        let decoded
        RNSecureStorage.get("token").then((value) => {
            token = value
            decoded = jwtDecode(token)
            this.setState({
                id: decoded["dataId"]
            })
        }).catch((err) => {
            console.log(err)
        })
        const posts = this.props.prop
        posts.map((item) => {
            return this.setState({
                Name: item.Name,
                id: item.id,
                Skill: item.Skill,
                Showcase: item.Showcase,
                DOB: item.DOB,
                Description: item.Description,
                email: item.email,
                expected_salary: item.expected_salary,
                Location: item.Location,
                Date_created: item.Date_created.split('T')[0],
                Photo: item.Photo == '' ?
                    { uri: `http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg` } :
                    item.Photo
            })
        })

    }


    editData() {
        const photo = {
            uri: this.state.uri,
            type: this.state.type,
            name: this.state.fileName
        }

        const formData = new FormData()
        formData.append('id', this.state.id)
        formData.append('email', this.state.email)
        formData.append('Name', this.state.Name)
        formData.append('Photo', photo)
        formData.append('Description', this.state.Description)
        formData.append('Skill', this.state.Skill)
        formData.append('Location', this.state.Location)
        formData.append('DOB', moment(this.state.DOB).format('YYYY-MM-DD'))
        formData.append('Showcase', this.state.Showcase)
        formData.append('Date_created', this.state.Date_created)
        formData.append('expected_salary', this.state.expected_salary)
        const config = {
            headers: {
                'content-type': 'multipart/form-data' + formData
            }
        }
        this.props.fetchUpdate(this.state.id, formData, config)

        Alert.alert(
            'Are you sure?',
            'Your profile will be change',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.push('MyProfile', {
                            id: this.state.id
                        })
                        this.refresh()
                    }
                },
            ],
            { cancelable: false }
        )

    }

    UploadPhoto = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.fileSize > 2048000) {
                this.setState({
                    photoErr: 'File too large max 2 MB'
                })
            }
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    Photo: source,
                    isSelectedPhoto: 1,
                    uri: response.uri,
                    fileName: response.fileName,
                    type: response.type,
                    data: response.data
                });
            }
        });
    }
    render() {
        const { isLoading, photoErr, fileName } = this.state
        const posts = this.props.prop
        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );
        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: "white", flex: 1 }} >
                        {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> : posts.map((post, index) =>
                            <Form style={{ padding: 10 }} >
                                <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 30, }}>EDIT NEW PHOTO</Label>
                                <TouchableOpacity onPress={this.UploadPhoto} style={{ marginTop: 20 }}>
                                    <Image source={this.state.isSelectedPhoto ? this.state.Photo :
                                        this.state.Photo === '' ?
                                            { uri: 'https://http://raivens.com/wp-content/uploads/2016/08/Dummy-image.jpg' } : { uri: this.state.Photo }}
                                        style={style.image} >
                                    </Image>
                                    <View style={{
                                        elevation: 100,
                                        position: 'relative'
                                    }}>
                                        <Icon2 name="photo-camera" size={100} style={{ top: -200, left: 120, color: "rgba(0,0,0,.5)" }} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: -90 }}>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>note: Make sure the uploaded image is less than 2 mb</Text>
                                </View>
                                <View>
                                    <Text>{fileName}</Text>
                                </View>
                                <View style={{ marginTop: 15, alignItems: 'center' }}>
                                    <Text style={{ fontstyle: 'italic', color: 'red' }}>
                                        {photoErr}
                                    </Text>
                                </View>

                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='id'
                                    name='id'
                                    className='form-control'
                                    value={post.id}
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='password'
                                    name='password'
                                    className='form-control'
                                    value={post.password}
                                    onChangeText={(value) => {
                                        this.setState({
                                            password: value
                                        })
                                    }}
                                />
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Date_created'
                                    name='Date_created'
                                    className='form-control'
                                    value={post.Date_created}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Date_created: value
                                        })
                                    }}
                                />

                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='Name'
                                    name='Name'
                                    value={post.Name}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Name: value
                                        })
                                    }}
                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='email'
                                    name='email'
                                    value={post.email}
                                    onChangeText={(value) => {
                                        this.setState({
                                            email: value
                                        })
                                    }}
                                />
                                <Input

                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='DOB'
                                    name="DOB"
                                    value={post.DOB}
                                    onChangeText={(value) => {
                                        this.setState({
                                            DOB: value
                                        })
                                    }}

                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='Skill'
                                    name="Skill"
                                    value={post.Skill}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Skill: value
                                        })
                                    }}
                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='Location'
                                    name="Location"
                                    value={post.Location}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Location: value
                                        })
                                    }}
                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='Showcase'
                                    name="Showcase"
                                    value={post.Showcase}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Showcase: value
                                        })
                                    }}
                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='Description'
                                    name="Description"
                                    value={post.Description}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Description: value
                                        })
                                    }}
                                />
                                <Input
                                    style={{ display: 'none' }}
                                    type='hidden'
                                    id='expected_salary'
                                    name="expected_salary"
                                    value={post.expected_salary}
                                    onChangeText={(value) => {
                                        this.setState({
                                            expected_salary: value
                                        })
                                    }}
                                />

                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        {photoErr ? <Button disabled onPress={() => alert('Cannot submit if photo is wrong')} style={{ width: 100 }}>
                                            <Text style={style.textButton}>SUBMIT</Text>
                                        </Button> :
                                            <Button style={style.button} onPress={this.editData} style={{ width: 100 }}>
                                                <Text style={style.textButton}>SUBMIT</Text>
                                            </Button>}
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Button color="info" style={style.button} style={{ width: 100 }} onPress={() => {
                                            this.props.navigation.push('MyProfile', {
                                                id: this.state.id
                                            })
                                        }}>
                                            <Text style={style.textButton}>CANCEL</Text>
                                        </Button>
                                    </View>
                                </View>

                            </Form>
                        )}
                    </View>
                </ScrollView>
            </>

        )
    }
}
const mapStateToProps = state => ({
    propsDetail: state.engineers
})

const mapDispatchToProps = dispatch => ({
    fetch: id => dispatch(fetchDetailEngineers(id)),
    fetchUpdate: (id, data, config) => dispatch(fetchUpdateEngineers(id, data, config))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditPhotoEngineers))

const style = StyleSheet.create({

    image: {
        height: 300,
        flex: 1,
        borderColor: 'blue',
        borderWidth: 2
    },
    textButton: {
        color: 'white',
        paddingLeft: 25
    }
})
