import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { Card, Icon, Divider, Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';              
import Expo from 'expo'; 

class History extends Component {
  static navigationOptions = {
    title: 'Past Orders',
  };

  render() {
    return (
      <ScrollView>
      <Animatable.View animation="fadeInUp" duration={1000} delay={500}>

      <View style={{paddingTop: 10}}>
      <Card>
        <Text style={styles.b}>Order No. - 611 <Text style={styles.a}>                    Delivered</Text></Text>

      <Text>Talwandi</Text>
      <Text style={{fontSize:15, paddingTop:7}}> 710 ₹</Text>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
      <Text>McVeggie X 3, French Fires( Large ) X 2, McAlooTikki  X 1, Coke ( Medium ) X 1</Text>
      <Text style={{paddingTop:8, fontSize:11, paddingBottom:10}}>July 19, 7:50 PM</Text>
      <Rating type="star" ratingCount={5} imageSize={14} 
       startingValue={4} style={{ alignItems: "flex-start"}} readonly />

      </Card>
      </View>

      <View style={{paddingTop:10}}>
      <Card>
        <Text style={styles.b}>Order No. - 519<Text style={styles.c}>                   Cancelled</Text></Text>

      <Text>Gumanpura</Text>
      <Text style={{fontSize:15,  paddingTop:7}}> 580 ₹ </Text>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
      <Text>Sizzler X 1, Veg Manchurian X 2</Text>
      <Text style={{paddingTop:8, fontSize:11, paddingBottom:10}}>25 February, 1:55 PM</Text>
      <Rating type="star" ratingCount={5} onFinishRating={this.ratingCompleted} 
        imageSize={14} style={{ alignItems: "flex-start"}} startingValue={2.5} readonly={true} />
      </Card>
      </View>

      <View style={{paddingTop:10}}>
      <Card>
        <Text style={styles.b}>Order No. - 415 <Text style={styles.a}>                   Delivered</Text></Text>

      <Text>Aerodrome Circle</Text>
      <Text style={{fontSize:15,  paddingTop:7}}> 510 ₹ </Text>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
      <Text>Peppy Paneer Pizza X 1 ( Small ), Garlic Bread X 1, Cheese Dip X 1  </Text>
      <Text style={{paddingTop:8, fontSize:11, paddingBottom:10}}>17 January, 7:58 PM</Text>
      <Rating type="star" ratingCount={5} onFinishRating={this.ratingCompleted} 
        imageSize={14} style={{ alignItems: "flex-start"}} startingValue={5} readonly={true}/>
      </Card>
      </View>

      <View style={{paddingTop:10}}>
      <Card>
        <Text style={styles.b}>Order No. - 336 <Text style={styles.d}>                     Pending</Text></Text>

      <Text>Rampura</Text>
      <Text style={{fontSize:15,  paddingTop:7}}> 460 ₹ </Text>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
      <Text>Chilli Potato X 1, Oreo Shake X 1 ( Regular )</Text>
      <Text style={{paddingTop:8, fontSize:11, paddingBottom:10}}>30 December, 7:58 PM</Text>
      <Rating type="star" ratingCount={5} onFinishRating={this.ratingCompleted} 
        imageSize={14} style={{ alignItems: "flex-start"}} startingValue={4} readonly={true}/>
      </Card>
      </View>

      <View style={{paddingTop:10}}>
      <Card>
        <Text style={styles.b}>Order No. - 223 <Text style={styles.a}>                   Delivered</Text></Text>

      <Text>Dadabari</Text>
      <Text style={{fontSize:15,  paddingTop:7}}> 335 ₹ </Text>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}/>
      <Text>Panner Tikka X 1, Kaju Curry X 2, Panner Butter Masala X 1, Jeera Rice X 2 </Text>
      <Text style={{paddingTop:8, fontSize:11, paddingBottom:10}}>5 December, 6:22 PM</Text>
      <Rating type="star" ratingCount={5} onFinishRating={this.ratingCompleted} 
        imageSize={14} style={{ alignItems: "flex-start"}} startingValue={3.5} readonly={true}/>
      </Card>
      </View>

      </Animatable.View>
      </ScrollView>
    );
  }
}
 
export default History;

const styles = StyleSheet.create({
  a: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'green'
  },
  b: {
    fontSize: 16,
    color: '#4287f5'
  },
  c: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'red'
  },
  d: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'orange',
  },
})