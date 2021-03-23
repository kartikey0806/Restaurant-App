import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card, Divider, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

  sendMail() {
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })
  }

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={1000} delay={400}> 
      <Card style={{ marginTop: 20 }}>
        <View style={styles.view}>
          <Text style={styles.app}>Contact Information</Text>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Text style={styles.input}>121, Clear Water Bay Road</Text>
          <Text style={styles.input}>Clear Water Bay, Kowloon</Text>
          <Text style={styles.input}>HONG KONG</Text>
          <Text style={styles.input}>Tel: +852 1234 5678</Text>
          <Text style={styles.input}>Fax: +852 8765 4321</Text>
          <Text style={styles.input}>Email: confusion@food.net</Text>
          <Text></Text>
          
          <View style={{flexDirection: 'row', alignSelf: 'center', backgroundColor: '#512DA8', opacity: 0.8}}>
          <Icon name="envelope" type="font-awesome" style={{paddingLeft: 5, paddingTop: 10, backgroundColor: '#512DA8'}} color="white"/>
          <Button
            color="white"
            title="SEND EMAIL"
            onPress={this.sendMail}
          />
          </View>
        </View>
      </Card>
      </Animatable.View>
    );
  }
}

export default Contact;


const styles = StyleSheet.create({
  input: {
    paddingTop: 1,
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 15,
    textAlign: 'left',
    color: '#487ccf',
  },
  app: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 3,
    fontWeight: 'bold',
  },
  view:{
    backgroundColor: '#fff',
    paddingBottom: 25, 
    paddingTop: 20, 
    paddingLeft: 10, 
    paddingRight: 10
  }
});