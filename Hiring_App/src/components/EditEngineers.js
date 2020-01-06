import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native'
import jwtDecode from 'jwt-decode'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { DatePicker, Button, Item, Label, Input, Form } from 'native-base'
import { Bubbles } from 'react-native-loader'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchUpdateEngineers, fetchDetailEngineers } from '../public/redux/actions/engineers'
import { withNavigation } from 'react-navigation'
class EditEngineers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenDate: new Date(),
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
            isLoading: false
        }
        this.validateForm = this.validateForm.bind(this)
        this.editData = this.editData.bind(this)
        this.setDate = this.setDate.bind(this)
    }
    setDate(newDate) {
        this.setState({ DOB: moment(newDate).format('YYYY/MM/DD') });
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
    componentDidMount() {
        let token
        let decoded
        RNSecureStorage.get("token").then((value) => {
            console.log(value) // Will return direct value
            token = value
            decoded = jwtDecode(token)
            console.log(decoded);
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
                DOB: item.DOB.split('T')[0],
                Description: item.Description,
                email: item.email,
                expected_salary: item.expected_salary,
                Location: item.Location,
                Date_created: item.Date_created.split('T')[0],
                Photo: item.Photo
            })
        })
    }
    // )
    // }

    editData() {
        const { Name, email, Location, Description, Showcase, Skill, DOB, expected_salary } = this.state
        console.log(this.state.Photo, this.state.Name);
        if (Name && email && Location && Description && Showcase && Skill && DOB && expected_salary) {
            const formData = new FormData()
            formData.append('id', this.state.id)
            formData.append('email', this.state.email)
            formData.append('Name', this.state.Name)
            formData.append('Photo', this.state.Photo)
            formData.append('Description', this.state.Description)
            formData.append('Skill', this.state.Skill)
            formData.append('Location', this.state.Location)
            formData.append('DOB', moment(this.state.DOB).format('YYYY-MM-DD'))
            formData.append('Showcase', this.state.Showcase)
            formData.append('Date_created', this.state.Date_created)
            formData.append('expected_salary', this.state.expected_salary)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; boundary=' + formData._boundary
                }
            }
            this.props.fetchUpdate(this.state.id, formData, config)
            console.log(formData);

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
                        text: 'OK', onPress: () => this.props.navigation.push('MyProfile', {
                            id: this.state.id
                        })
                    },
                ],
                { cancelable: false }
            )
        } else {
            alert('all data must be fulfilled')
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
        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: "white" }} >
                        {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> : posts.map((post, index) =>
                            <Form style={{ padding: 10 }} >
                                <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold' }}>EDIT ENGINEERS</Label>
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
                                <Input style={{ display: 'none' }}
                                    type='hidden'
                                    id='Photo'
                                    name='Photo'
                                    className='form-control'
                                    value={post.Photo}
                                    onChangeText={(value) => {
                                        this.setState({
                                            Photo: value
                                        })
                                    }}
                                />

                                <Item stackedLabel>
                                    <Label>Name</Label>
                                    <Input
                                        type='text'
                                        id='Name'
                                        name='Name'
                                        value={post.Name}
                                        onChangeText={(value) => {
                                            this.setState({
                                                Name: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Email</Label>
                                    <Input
                                        type='text'
                                        id='email'
                                        name='email'
                                        value={post.email}
                                        onChangeText={(value) => {
                                            this.setState({
                                                email: value
                                            })
                                        }}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>DOB  </Label>
                                    <DatePicker
                                        defaultDate={new Date(2000, 1, 1)}
                                        minimumDate={new Date(1880, 1, 1)}
                                        maximumDate={new Date(2020, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Select date"
                                        textStyle={{ color: "green" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}

                                    />
                                    <Text>
                                        Date: {this.state.DOB}
                                    </Text>

                                </Item>
                                <Item stackedLabel>
                                    <Label>Skill</Label>
                                    <Input
                                        type='text'
                                        id='Skill'
                                        name="Skill"
                                        value={post.Skill}
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
                                        value={post.Location}
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
                                        value={post.Showcase}
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
                                        value={post.Description}
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
                                        value={post.expected_salary}
                                        onChangeText={(value) => {
                                            this.setState({
                                                expected_salary: value
                                            })
                                        }}
                                    />
                                </Item>


                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                    <Button style={style.button} onPress={this.editData}>
                                        <Text style={style.textButton}>SUBMIT</Text>
                                    </Button>
                                    <Button color="info" style={style.button} onPress={() => {
                                        this.props.navigation.push('MyProfile', {
                                            id: this.state.id
                                        })
                                    }}>
                                        <Text style={style.textButton}>CANCEL</Text>
                                    </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditEngineers))
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
// import React, { Component, Fragment } from 'react';
// import * as Yup from 'yup'
// import { Formik } from 'formik'
// import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from 'react-native'
// import jwtDecode from 'jwt-decode'
// import RNSecureStorage from 'rn-secure-storage'
// import { DatePicker, Button, Label, Form } from 'native-base'
// import { Bubbles } from 'react-native-loader'
// import moment from 'moment'
// import { connect } from 'react-redux'
// import { fetchUpdateEngineers, fetchDetailEngineers } from '../public/redux/actions/engineers'
// import { withNavigation } from 'react-navigation'
// class EditEngineers extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             chosenDate: new Date(),
//             id: '',
//             Name: '',
//             Skill: '',
//             DOB: '',
//             expected_salary: '',
//             Description: '',
//             Showcase: '',
//             email: '',
//             Location: '',
//             Date_created: '',
//             password: '',
//             Date_update: '',
//             isModalVisible: false,
//             Photo: null,
//             show: false,
//             isLoading: false
//         }
//         this.editData = this.editData.bind(this)
//         this.setDate = this.setDate.bind(this)
//     }
//     setDate(newDate) {
//         this.setState({ DOB: moment(newDate).format('YYYY/MM/DD') });
//     }

//     componentDidMount() {
//         let token
//         let decoded
//         RNSecureStorage.get("token").then((value) => {
//             console.log(value) // Will return direct value
//             token = value
//             decoded = jwtDecode(token)
//             console.log(decoded);
//             this.setState({
//                 id: decoded["dataId"]
//             })
//         }).catch((err) => {
//             console.log(err)
//         })
//         const posts = this.props.prop
//         posts.map((item) => {
//             return this.setState({
//                 Name: item.Name,
//                 password: item.password,
//                 id: item.id,
//                 Skill: item.Skill,
//                 Showcase: item.Showcase,
//                 DOB: item.DOB.split('T')[0],
//                 Description: item.Description,
//                 email: item.email,
//                 expected_salary: item.expected_salary,
//                 Location: item.Location,
//                 Date_created: item.Date_created.split('T')[0],
//                 Photo: item.Photo
//             })
//         })
//     }

//     editData(v) {
//         const formData = new FormData()
//         formData.append('id', this.state.id)
//         formData.append('email', v['email'])
//         formData.append('Name', v['Name'])
//         formData.append('Photo', this.state.Photo)
//         formData.append('password', this.state.password)
//         formData.append('Description', v['Description'])
//         formData.append('Skill', v['Skill'])
//         formData.append('Location', v['Location'])
//         formData.append('DOB', moment(this.state.DOB).format('YYYY-MM-DD'))
//         formData.append('Showcase', v['Showcase'])
//         formData.append('Date_created', this.state.Date_created)
//         formData.append('expected_salary', v['expected_salary'])
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data; boundary=' + formData._boundary
//             }
//         }
//         this.props.fetchUpdate(this.state.id, formData, config)
//         console.log(formData);

//         Alert.alert(
//             'Are you sure?',
//             'Your profile will be change',
//             [
//                 {
//                     text: 'Cancel',
//                     onPress: () => console.log('Cancel Pressed'),
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'OK', onPress: () => this.props.navigation.push('MyProfile', {
//                         id: this.state.id
//                     })
//                 },
//             ],
//             { cancelable: false }
//         )

//     }


//     render() {
//         const { isLoading, email, Description, Skill, Showcase, Location, expected_salary, Name, id, DOB } = this.state
//         const posts = this.props.prop
//         setTimeout(
//             function () {
//                 this.setState({ isLoading: true });
//             }
//                 .bind(this),
//             2000
//         );
//         return (
//             <Formik
//                 initialValues={{ email: email, Description: Description, Skill: Skill, Showcase: Showcase, Location: Location, expected_salary: expected_salary, Name: Name }}
//                 onSubmit={values => this.editData(values)}
//                 validationSchema={Yup.object().shape({
//                     Name: Yup.string()
//                         .label('Name')
//                         .required()
//                         .max(40, 'Max 40 characters'),
//                     email: Yup.string()
//                         .label('email')
//                         .email('Enter a valid email')
//                         .required('Please enter a registered email'),
//                     Description: Yup.string()
//                         .label('Description')
//                         .required()
//                         .max(150, 'Max 150 characters'),
//                     Skill: Yup.string()
//                         .label('Skill')
//                         .required()
//                         .max(150, 'Max 150 characters'),
//                     Showcase: Yup.string()
//                         .label('Showcase')
//                         .required()
//                         .max(40, 'Max 150 characters'),
//                     Location: Yup.string()
//                         .label('Location')
//                         .required()
//                         .max(100, 'Max 100 characters'),
//                     expected_salary: Yup.string()
//                         .label('expected_salary')
//                         .required()
//                         .max(40, 'Max 40 characters'),
//                 })}
//             >
//                 {({ values, handleChange, errors, handleBlur, touched, isValid, setFieldValue, handleSubmit }) => (
//                     <Fragment>
//                         <ScrollView>
//                             <View style={{ backgroundColor: "white" }} >
//                                 {!isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}><Bubbles size={10} style={{ marginTop: 500 }} color="green" /></View> : posts.map((post, index) =>
//                                     <Form style={{ padding: 10 }} >
//                                         <Label style={{ paddingTop: 20, textAlign: 'center', fontWeight: 'bold' }}>EDIT ENGINEERS</Label>
//                                         <TextInput
//                                             value={Name}
//                                             onChangeText={handleChange('Name')}
//                                             onBlur={() => handleBlur('Name')}
//                                             placeholder="Name"
//                                         />
//                                         {touched.Name && errors.Name &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.Name}</Text>
//                                         }
//                                         <TextInput
//                                             value={email}
//                                             onChangeText={handleChange('email')}
//                                             onBlur={() => handleBlur('email')}
//                                             placeholder="E-mail"
//                                         />
//                                         {touched.email && errors.email &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
//                                         }
//                                         {/* <Item stackedLabel>
//                                             <Label>DOB  </Label> */}
//                                         <DatePicker
//                                             defaultDate={new Date(2000, 1, 1)}
//                                             minimumDate={new Date(1880, 1, 1)}
//                                             maximumDate={new Date(2020, 12, 31)}
//                                             locale={"en"}
//                                             timeZoneOffsetInMinutes={undefined}
//                                             modalTransparent={false}
//                                             animationType={"fade"}
//                                             androidMode={"default"}
//                                             placeHolderText="Select date"
//                                             textStyle={{ color: "green" }}
//                                             placeHolderTextStyle={{ color: "#d3d3d3" }}
//                                             onDateChange={this.setDate}
//                                             disabled={false}

//                                         />
//                                         <Text>
//                                             DOB: {DOB}
//                                         </Text>

//                                         {/* </Item> */}
//                                         <TextInput
//                                             value={Skill}
//                                             onChangeText={handleChange('Skill')}
//                                             onBlur={() => handleBlur('Skill')}
//                                             placeholder="Skill"
//                                         />
//                                         {touched.Skill && errors.Skill &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.Skill}</Text>
//                                         }
//                                         <TextInput
//                                             value={Location}
//                                             onChangeText={handleChange('Location')}
//                                             onBlur={() => handleBlur('Location')}
//                                             placeholder="Location"
//                                         />
//                                         {touched.Location && errors.Location &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.Location}</Text>
//                                         }
//                                         <TextInput
//                                             value={Showcase}
//                                             onChangeText={handleChange('Showcase')}
//                                             onBlur={() => handleBlur('Showcase')}
//                                             placeholder="Showcase"
//                                         />
//                                         {touched.Showcase && errors.Showcase &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.Showcase}</Text>
//                                         }
//                                         <TextInput
//                                             value={Description}
//                                             onChangeText={handleChange('Description')}
//                                             onBlur={() => handleBlur('Description')}
//                                             placeholder="Description"
//                                         />
//                                         {touched.Description && errors.Description &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.Description}</Text>
//                                         }
//                                         <TextInput
//                                             value={expected_salary}
//                                             onChangeText={handleChange('expected_salary')}
//                                             onBlur={() => handleBlur('expected_salary')}
//                                             placeholder="Expected Salary"
//                                         />
//                                         {touched.expected_salary && errors.expected_salary &&
//                                             <Text style={{ fontSize: 10, color: 'red' }}>{errors.expected_salary}</Text>
//                                         }

//                                         <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
//                                             <Button style={style.button} disable={!isValid} onPress={handleSubmit}>
//                                                 <Text style={style.textButton}>SUBMIT</Text>
//                                             </Button>
//                                             <Button color="info" style={style.button} onPress={() => {
//                                                 this.props.navigation.push('MyProfile', {
//                                                     id: id
//                                                 })
//                                             }}>
//                                                 <Text style={style.textButton}>CANCEL</Text>
//                                             </Button>
//                                         </View>

//                                     </Form>
//                                 )}
//                             </View>
//                         </ScrollView>
//                     </Fragment>
//                 )}
//             </Formik>

//         )
//     }
// }
// const mapStateToProps = state => ({
//     propsDetail: state.engineers
// })

// const mapDispatchToProps = dispatch => ({
//     fetch: id => dispatch(fetchDetailEngineers(id)),
//     fetchUpdate: (id, data, config) => dispatch(fetchUpdateEngineers(id, data, config))
// })
// export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditEngineers))
// const style = StyleSheet.create({
//     profile: {
//         height: 200,
//         width: 200,
//         backgroundColor: "black",
//         flex: 1,
//         borderRadius: 50
//     },
//     image: {
//         height: undefined,
//         width: undefined,
//         flex: 1,
//         resizeMode: 'cover',
//         borderRadius: 500
//     },
//     button: {
//         width: 100, marginRight: 20, marginLeft: 20, borderRadius: 10
//     },
//     textButton: {
//         color: "white",
//         paddingLeft: 25,
//         fontWeight: 'bold'
//     }
// })