import React, { Component } from 'react';
import { FlatList, View, Text, Alert, StyleSheet, ScrollView, Button, Modal, SafeAreaView, Platform, Picker, MultipleChoice, CheckBox, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Divider, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { DISHES } from '../shared/dishes';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapDispatchToProps = dispatch => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishes: DISHES,
      tax: 1.25,
      fee: 1.5,
      price: 4.65,
      showModal: false,
      showModal1: false
    }
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  toggleModal1() {
    this.setState({showModal1: !this.state.showModal1})
  }

  static navigationOptions = {
    title: 'My Favorites', 
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [{
        text: 'Delete', 
        type: 'delete',
        onPress: () => {
          Alert.alert(
          'Delete Favorite?',
          'Are you sure you wish to delete the favorite dish ' + item.name + '?',
          [{ text: 'Cancel' },
          { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }],
          { cancelable: false }
          )}
      }];

      return (
        <View>
        <Swipeout right={rightButton} autoClose={true} style={{backgroundColor: '#dfff'}}>
        <Animatable.View animation="fadeInUp" duration={1000} style={{backgroundColor: '#dfff'}}>
        <View style={{ backgroundColor: '#Dfff' }}>
        <ListItem
          key={index}
          title={item.name}
          rightSubtitle = {item.price}
          rightSubtitleStyle={{fontWeight: 'bold'}}
          bottomDivider 
          rightTitle="Quantity: 1" rightTitleStyle={{fontSize: 15}}
          hideChevron={true}
          style={{ padding: 5, paddingLeft: 10}}
          onPress={() => navigate('Dishdetail', { dishId: item.id })}
          leftAvatar={{ source: require('../images/gs.jpg') }}
        />
        </View>
        </Animatable.View>
        </Swipeout>
        
        </View>
      );
    };

      return (
        <ScrollView style={{backgroundColor: '#dfff'}}>
          <FlatList
            data={this.state.dishes.filter((dish) => this.props.favorites.some((el) => el === dish.id))}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <View style={{backgroundColor:'#dfff', height: 700}}>
            <Text style={styles.a}>Order Details</Text>
            <Text style={styles.b}>{this.props.favorites.length} ITEMS</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.c}>Item Total </Text>
              <Text style={styles.j}>{this.state.price * this.props.favorites.length} $</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.d}>Delivery Fee</Text>
              <Icon name="info-circle" type="font-awesome" color="black" size={15} style={{paddingTop: 3,paddingLeft: 5}}/>
              <Text style={styles.e}>{this.state.fee * this.props.favorites.length} $</Text>
            </View>
            <Divider style={styles.i} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.f}>Taxes and Charges</Text>
              <Icon name="info-circle" type="font-awesome" color="black" size={15} style={{paddingTop: 5,paddingLeft: 5}}/>
              <Text style={styles.g}>{this.state.tax * this.props.favorites.length} $</Text>
            </View>
            <Divider style={{ margin: 10 }}/>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold', paddingLeft: 20}}>Total Amount To Pay</Text>
              <Text style={styles.h}>{this.state.price * this.props.favorites.length + this.state.fee * this.props.favorites.length + this.state.tax * this.props.favorites.length } $</Text>
            </View>

            {/* <View style={{margin: 20, backgroundColor: '#512da8'}}>
              <Button title="Proceed to Pay" color="white" onPress={() => !this.toggleModal()} />
            </View> */}
            <View style={{margin: 20, backgroundColor: '#512da8'}}>
              <Button title="Proceed to Pay" color="#512da8" onPress={() => !this.toggleModal()} />
            </View>

          </View>
              
          {/* <Button title="Close" onPress={() => this.toggleModal()}/> */}

          <Modal animationType = {"slide"} transparent = {false} visible = {this.state.showModal}>
            <SafeAreaView style={{backgroundColor: '#dfff', height: 1000}}>
            <View style={{position: "relative"}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Icon name="keyboard-backspace" style={{paddingTop: 15, paddingLeft: 15}} size={25}/>
                </TouchableOpacity>
              <Text style={{ paddingLeft: 5, fontSize: 18, fontWeight: 'bold', paddingTop: 15}}>PAYMENTS</Text>
              </View>
              <Text style={{paddingLeft: 43}}>{this.props.favorites.length} Items, To Pay: {this.state.price * this.props.favorites.length + this.state.fee * this.props.favorites.length + this.state.tax * this.props.favorites.length } $ </Text>
              <Divider style={{marginHorizontal: 10, marginVertical: 5}}/>
            </View>
            
            {/* <Text style={{fontSize: 12, padding: 20}}>WALLETS</Text>
            <View>
            <ListItem title="Paytm" rightSubtitle="LINK ACCOUNT" rightSubtitleStyle={{fontSize: 9, color:'orange', fontWeight: 'bold'}} leftAvatar={{source: require('../images/paytm1.png')}}/>
            <Divider style={{marginLeft: 20, marginRight: 20}} />
            <ListItem title="Google Pay" rightSubtitle="LINK ACCOUNT" rightSubtitleStyle={{fontSize: 9, color:'orange', fontWeight: 'bold'}} leftAvatar={{source: require('../images/gpay.png')}}/>
            <Divider style={{marginLeft: 20, marginRight: 20}} />
            <ListItem title="Bhim UPI" rightSubtitle="LINK ACCOUNT" rightSubtitleStyle={{fontSize: 9, color:'orange', fontWeight: 'bold'}} leftAvatar={{source: require('../images/upi.png')}}/>            
            </View> */}
            {/* <Button title="Close" onPress={() => this.toggleModal()}/> */}
              
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, padding: 20, fontWeight: '700'}}>WALLETS</Text>
            <Picker
              selectedValue={this.state.paymentMode}
              style={{height: 50, width: 180, marginLeft: 80 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({paymentMode: itemValue})
              }>
              <Picker.Item label="Paytm" value="Paytm" />
              <Picker.Item label="Googe Pay" value="Googe Pay" />
              <Picker.Item label="Pay Pal" value="Pay Pal" />
              <Picker.Item label="Bhim UPI" value="Bhim UPI" />
              <Picker.Item label="Amazon Pay" value="Amazon Pay" />
            </Picker>
            </View>
              
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, padding: 20, fontWeight: '700'}}>CREDIT/ DEBIT CARDS</Text>
            <Picker
              selectedValue={this.state.paymentMode1}
              style={{height: 50, width: 180 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({paymentMode1: itemValue})
              }
              >
              <Picker.Item label="VISA  -- 1839 XXXX XXXX 0192" value="Paytm" />
              <Picker.Item label="VISA  -- 9732 XXXX XXXX 4103" value="Googe Pay" />
            </Picker>
            </View>

            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, padding: 20, fontWeight: '700'}}>NET BANKING</Text>
            <Picker
              selectedValue={this.state.paymentMode2}
              style={{height: 50, width: 180, marginLeft: 52 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({paymentMode2: itemValue})
              }
              >
              <Picker.Item label="HDFC" value="HDFC" />
              <Picker.Item label="State Bank of India" value="SBI" />
              <Picker.Item label="ICICI" value="ICICI" />
              <Picker.Item label="Union Bank of India" value="UBI" />
            </Picker>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 15, padding: 20, fontWeight: '700'}}>CASH ON DELIVERY</Text><CheckBox style={{marginTop: 10 }}/>
            </View>

            <Divider style={{marginHorizontal: 20, marginBottom: 5}}/>

            <View style={styles.o}>
            <Text style={styles.p}>DUE TO COVID-19</Text>
              <View style={{flexDirection: 'row'}}><CheckBox color='orange'/><Text style={styles.n}>Opt. in for NO-Contact Delivery</Text></View>
              <Text style={{fontSize: 15, paddingLeft: 10 }}>Our Delivery Agent will call you after reaching and leave the order at your door/gate. Please ensure that there is a table/stool outside your door for keeping the order .</Text>
            </View>

            <View>
              
            </View>

            <View style={{margin: 60}}>
              <Button title="Place your Order" color="#512da8" onPress={() => !this.toggleModal1()}/>
            </View>


            </SafeAreaView>
          </Modal>

          <Modal animationType = {"zoom"} transparent = {false} visible = {this.state.showModal1}>
            <View>
              <Button title="hey" onPress={() => this.toggleModal()} />
            </View>
          </Modal>
        
        </ScrollView>
        );
      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles = StyleSheet.create({
  a:{
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold' ,
    paddingLeft: 20
  },
  b: {
    fontSize: 15, 
    paddingLeft: 20, 
    paddingTop: 1,
  },
  c:{
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 15
  },
  d:{
    paddingLeft: 20,
    fontSize: 15
  },
  e:{
    paddingLeft: 190,  
  },
  f:{
    paddingLeft: 20,
    fontSize: 17
  },
  g:{
    paddingLeft: 132,  
  },
  h: {
    paddingLeft: 137,
    fontSize: 18
  },
  i: {
    margin: 5, 
    marginLeft:10, 
    marginRight: 10
  },
  j:{
    paddingLeft: 216,
    paddingTop: 10  
  },
  k: {
    color:'orange', 
    fontSize: 11, 
    paddingTop: 13, 
    paddingLeft: 150, 
    fontWeight: 'bold'
  },
  l: {
    width: 50, 
    height: 50, 
    marginLeft: 17
  },
  m: {alignItems: 'flex-start', paddingLeft: 20, paddingTop: 10},
  n: {
    paddingLeft: 5,
    color: '#512da8',
    fontSize: 20,
    fontWeight: 'bold'
  },
  o: {
    marginHorizontal: 20, 
    borderColor: 'black', 
    borderWidth: 1, 
    paddingBottom: 10, 
    paddingTop: 10, 
    borderRadius: 20,
    backgroundColor: '#f1ebfc'
  },
  p:{
    paddingLeft: 40,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
