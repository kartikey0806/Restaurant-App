import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'; 
import * as ImageManipulator from 'expo-image-manipulator';
import * as Asset from 'expo-asset';
import Constants from 'expo-constants';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as Animatable from 'react-native-animatable';

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    componentDidMount() {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true})
            }
        })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20, fontWeight: 'bold', paddingLeft: 13, paddingBottom: 10}}>Login</Text>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title=" Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
                <View style={styles.formButton}>
                    <Text style={{fontSize: 15, color: 'blue', textAlign: 'center'}}>Don't have account ? </Text>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title=" Register Now"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "darkblue"
                        }}
                        />
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: null 
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri});
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    
    getImagefromGallery = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ imageUrl: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

    render() {
        let { image } = this.state;
        return(
            <ScrollView>
                <Animatable.View animation="fadeInUp" duration={1500}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "10"} >
                <Text style={{fontSize:20, fontWeight: 'bold', paddingLeft: 30, paddingTop: 10}}>Register</Text>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('../images/logo.png')}
                        style={styles.image} 
                        />
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    
                    <View style={{marginLeft: 20, justifyContent: 'center'}}>
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                    />
                    </View>
                    <View style={{marginLeft: 35, justifyContent: 'center'}}>
                    <Button
                        title="Gallery"
                        onPress={this.getImagefromGallery}
                    />
                    </View>
                    
                    </View>
                </View>
                
                <View style={{marginTop: 10}}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title=" Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </KeyboardAvoidingView>
            </Animatable.View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#512DA8',
        inactiveBackgroundColor: '#9c7c60',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff'
    }
});

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flexDirection: 'row',
       
    },
    image: {
      margin: 10,
      width: 80,
      height: 90,
      borderRadius: 200
    },
    formInput: {
        margin: 1
    },
    formCheckbox: {
        backgroundColor: null
    },
    formButton: {
        margin: 20
    }
});