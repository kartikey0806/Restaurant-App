import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { ListItem, Card, Divider, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

class Start extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          
        <View style={styles.header}>
            <Image  source={require('../images/logo.png')} style={styles.logo} />
            <Text style={styles.title1}>Ristorante Con</Text>
            <Text style={styles.title2}>Fusion</Text>
        </View>

        <View style={styles.footer}>
        <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
        
            <Text style={styles.title}>Stay connected with us !</Text>
            <Text></Text>
            <Text style={styles.textSign}>Let's Explore <Text style={{fontSize: 30}}>{'\u2728'}</Text></Text>

            <View style={styles.button}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <LinearGradient colors={['#08D4C4', '#01AB9D']} style={styles.signIn}>
                    <Text style={styles.textSign}>Get Started</Text>
                    <Icon 
                        name="navigate-next"
                        color="black"
                        size={25}
                    />
                </LinearGradient>
            </TouchableOpacity> 
            </View>

        </Animatable.View>
        </View>
        
      </View>
    );
  }
}

export default (Start);

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#512DA8'
    },
    header: {
        flex: 1.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title1:{
        fontSize: 25,
        color: '#fff',
        paddingTop: 30,
        fontWeight: "bold"
    },
    title2:{
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    },
    logo: {
        width: 300,
        height: 210,
        alignSelf: 'center',
        marginLeft: 20,
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-start',
        marginTop: 30
    },
    signIn: {
        width: 190,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textSign: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
  });