import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView, Alert } from 'react-native'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { Left, List, ListItem, Body, Button, Item, Label, Input, Card, Form } from 'native-base'
import { Bubbles } from 'react-native-loader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Foundation'
import moment from 'moment'
// import DateTimePicker from '@react-native-community/datetimepicker'
import { connect } from 'react-redux'
import { fetchUpdateEngineers, fetchDetailEngineers, fetchDeleteEngineers } from '../public/redux/actions/engineers'
import { withNavigation } from 'react-navigation'
import Modal from "react-native-modal"
class EngineersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            Date_update: '',
            isModalVisible: false,
            Photo: null,
            show: false,
            nameErr: "",
            descriptionErr: "",
            emailErr: "",
            locationErr: "",
            photoErr: "",
            skillErr: '',
            DOBErr: '',
            expectedSalaryErr: '',
            showcaseErr: '',
            isLoading: false,
            date: new Date('2020-06-12T14:42:42'),
            show: false,
            mode: 'date',
        }
        this.validateForm = this.validateForm.bind(this)
        this.editData = this.editData.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleFieldChangeFile = this.handleFieldChangeFile.bind(this)
        // this.handleClose = this.handleClose.bind(this)
        // this.handleShow = this.handleShow.bind(this)
        this.delete = this.delete.bind(this)
    }
    delete() {
        this.props.fetchDelete(this.props.id)
        RNSecureStorage.remove("token")
        Alert.alert(
            'Are you sure?',
            'Click ok will delete your account',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () =>
                        // console.log(value)
                        this.props.navigation.navigate('Main')

                }
            ],
            { cancelable: false }
        )
    }
    handleFieldChange(value) {
        this.setState({
            [event.target.name]: value
        })
    }
    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }
    handleFieldChangeFile(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }
    validateForm(e) {
        e.preventDefault()
        const { Name, email, Photo, Location, Description, Showcase, Skill, DOB, expected_salary } = this.state

        if (!email) {
            this.setState({
                emailErr: "Email must not be empty"
            });
        } else if (!email.match(regex)) {
            this.setState({
                emailErr: "Invalid email"
            })
        } else {
            this.setState({
                emailErr: ""
            });
        }
        if (!Location) {
            this.setState({
                locationErr: "Location must not be empty"
            });
        } else {
            this.setState({
                locationErr: ""
            });
        }
        if (!Name) {
            this.setState({
                nameErr: "Name must not be empty"
            });
        } else {
            this.setState({
                nameErr: ""
            });

        }
        if (!Showcase) {
            this.setState({
                showcaseErr: "showcase must not be empty"
            });
        } else {
            this.setState({
                showcaseErr: ""
            });

        }
        if (!Skill) {
            this.setState({
                skillErr: "skill must not be empty"
            });
        } else {
            this.setState({
                skillErr: ""
            });

        }
        if (!DOB) {
            this.setState({
                DOBErr: "DOB must not be empty"
            });
        } else {
            this.setState({
                DOBErr: ""
            });

        }
        if (!expected_salary) {
            this.setState({
                expectedSalaryErr: "Expected salary must not be empty"
            });
        } else {
            this.setState({
                expectedSalaryErr: ""
            });

        }
        let photo = Photo.name.substring(Photo.name.lastIndexOf(".") + 1).toLowerCase()
        let ext = ["jpg", "jpeg", "png"]
        if (!Photo) {
            this.setState({
                photoErr: "Please upload your photo"
            });
        } else if (ext.indexOf(photo) === -1) {
            this.setState({
                photoErr: "Type your photo must be jpg/jpeg/png"
            });
        } else {
            this.setState({
                photoErr: ""
            });
        }
        if (!Description) {
            this.setState({
                descriptionErr: "Please choose your description"
            });
        } else {
            this.setState({
                descriptionErr: ""
            });
        }
        console.log(this.logoErr);
        this.editData()

    }
    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            DOB: date
        });
    }
    componentDidMount() {
        this.props.fetch(this.props.id)
            .then(() => {
                this.props.propsDetail.detailEngineers.map((item) => {
                    return this.setState({
                        Name: item.Name,
                        id: item.id,
                        Skill: item.Skill,
                        Showcase: item.Showcase,
                        DOB: item.DOB.split('T')[0],
                        Description: item.Description,
                        email: item.email,
                        expected_salary: item.expected_salary,
                        Location: item.Location,
                        Date_created: item.Date_created.split('T')[0]
                    })
                })
            })
    }

    editData(e) {
        e.preventDefault()
        const { Name, email, photoErr, Location, Description, Showcase, Skill, DOB, expected_salary } = this.state
        if (Name && email && photoErr !== undefined && Location && Description && Showcase && Skill && DOB && expected_salary) {
            const formData = new FormData()
            formData.append('id', this.state.id)
            formData.append('email', this.state.email)
            formData.append('Name', this.state.Name)
            formData.append('Photo', this.state.Photo)
            formData.append('Description', this.state.Description)
            formData.append('Skill', this.state.Skill)
            formData.append('Location', this.state.Location)
            formData.append('DOB', this.state.DOB)
            formData.append('Showcase', this.state.Showcase)
            formData.append('Date_created', this.state.Date_created)
            formData.append('expected_salary', this.state.expected_salary)

            const config = {
                headers: {
                    'content-type': 'multipart/form-data; boundary=' + formData._boundary
                }
            }
            this.props.fetchUpdate(this.props.id, formData, config)
            // swal("Good job!", "Engineer success edited", "success").then((ok) =>
            //     ok && document.location.reload())
            Alert.alert(
                'Are you sure?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => this.props.navigation.navigate('MyProfile') },
                ],
                { cancelable: false }
            )
        }
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    render() {
        const { isLoading, show, date, mode } = this.state
        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );
        // onTouchStart={this.show()}
        return (
            <>
                {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> :
                    this.props.propsDetail.detailEngineers.map((item, index) =>
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
                                    <Image source={{ uri: `${item.Photo}` }} style={style.image}>
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
                                    <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>{item.Name}</Text>
                                    <List>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="account-badge" size={30} color="blue" />
                                            </Left>
                                            <Body>

                                                <Text note numberOfLines={1}>DOB        : {
                                                    item.DOB ? moment(item.DOB.split('T')[0], 'YYYY-MM-DD').format('MMMM D YYYY') : ''

                                                }</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="email-open" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Email      : {item.email}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icons name="address" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Location : {item.Location}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="anchor" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Showcase : {item.Showcase}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon name="briefcase-account" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Description : {item.Description}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon1 name="dollar-bill" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={1}>Expected Salary : {item.expected_salary}</Text>
                                            </Body>
                                        </ListItem>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Icon1 name="social-skillshare" size={30} color="blue" />
                                            </Left>
                                            <Body>
                                                <Text note numberOfLines={2}>Skill : {item.Skill}</Text>
                                            </Body>
                                        </ListItem>
                                    </List>
                                </View>
                            </Card>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button primary style={style.button} title="Show modal" onPress={this.toggleModal}><Text style={style.textButton}> Edit </Text></Button>
                                <Button onPress={this.delete} danger style={style.button}><Text style={style.textButton}> Delete </Text></Button>
                            </View>
                        </View >
                    )
                }

                <Modal isVisible={this.state.isModalVisible}>
                    <ScrollView>
                        <View style={{ backgroundColor: "white" }} >
                            <Form style={{ padding: 10 }} >
                                <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold' }}>EDIT Engineers</Label>
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
                                <Item stackedLabel>
                                    <Label>Name</Label>
                                    <Input
                                        type='text'
                                        id='Name'
                                        name='Name'
                                        value={this.state.Name}
                                        onValueChange={(value) => { this.handleFieldChange(value) }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Email</Label>
                                    <Input
                                        type='text'
                                        id='email'
                                        name='email'
                                        value={this.state.email}
                                        onChangeText={(value) => {
                                            this.setState({
                                                email: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>DOB</Label>
                                    <Input

                                        type='text'
                                        id='DOB'
                                        name="DOB"
                                        value={this.state.DOB}
                                        onChangeText={(value) => {
                                            this.setState({
                                                DOB: value
                                            })
                                        }}

                                    />
                                    {/* {show && <DateTimePicker value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={this.setDate} />
                                        } */}
                                </Item>
                                <Item stackedLabel>
                                    <Label>Skill</Label>
                                    <Input
                                        type='text'
                                        id='Skill'
                                        name="Skill"
                                        value={this.state.Skill}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Skill: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Location</Label>
                                    <Input
                                        type='text'
                                        id='Location'
                                        name="Location"
                                        value={this.state.Location}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Location: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Showcase</Label>
                                    <Input
                                        type='text'
                                        id='Showcase'
                                        name="Showcase"
                                        value={this.state.Showcase}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Showcase: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Description</Label>
                                    <Input
                                        type='text'
                                        id='Description'
                                        name="Description"
                                        value={this.state.Description}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Description: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Expected Salary</Label>
                                    <Input
                                        type='text'
                                        id='expected_salary'
                                        name="expected_salary"
                                        value={this.state.expected_salary}
                                        onChangeText={(value) => {
                                            this.setState({
                                                expected_salary: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Photo</Label>
                                    <Input
                                        type='text'
                                        id='Photo'
                                        name='Photo'
                                        value={this.state.Photo}
                                        onChange={this.handleFieldChangeFile} />
                                </Item>
                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                    <Button style={style.button} onPress={this.editData}>
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
const mapStateToProps = state => ({
    propsDetail: state.engineers
})

const mapDispatchToProps = dispatch => ({
    fetch: id => dispatch(fetchDetailEngineers(id)),
    fetchUpdate: (id, data, config) => dispatch(fetchUpdateEngineers(id, data, config)),
    fetchDelete: id => dispatch(fetchDeleteEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EngineersProfile))
// export default withNavigation(Profile)
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