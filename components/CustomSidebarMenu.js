import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Divider } from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.items = [   
      {
        navOptionThumb: "person",
        navOptionName: 'Account                               ',
        screenToNavigate: 'Login',
      },
      {
        navOptionThumb: "home",
        navOptionName: 'Home                               ',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'restaurant',
        navOptionName: 'Menu                               ',
        screenToNavigate: 'Menu',
      },
      {
        navOptionThumb: 'apps',
        navOptionName: 'About Us                           ',
        screenToNavigate: 'About',
      },
      {
        navOptionThumb: 'favorite',
        navOptionName: 'Favorites                        ',
        screenToNavigate: 'Favorite'
      },
      {
        navOptionThumb: 'weekend',
        navOptionName: 'Reserve a Table            ',
        screenToNavigate: 'Reservation',
      }, 
      {
        navOptionThumb: 'history',
        navOptionName: 'Order History                ',
        screenToNavigate: 'History',
      }, 
      {
        navOptionThumb: 'contacts', 
        navOptionName: 'Contact                           ',
        screenToNavigate: 'Contact',
      }, 
      {
        navOptionThumb: 'keyboard-backspace', 
        navOptionName: 'Log Out                                     ',
        screenToNavigate: 'Start',
      },   
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={ require('../images/logo.png')}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.drawerHeaderText}>Ristorante Con</Text>
        <Text style={styles.drawerHeaderText}>Fusion</Text>
        
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex != key ? '#aebbd1' : '#e0dbdb',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="blue" />
              </View>
              
              <View>
              <Text
                style={{ fontSize: 17 }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
              </View>
              
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#aebbd1',
    alignItems: 'center',
    paddingTop: 20,
    flex: 1
  },
  sideMenuProfileIcon: {
    width: 120,
    height: 100,
    marginTop: 20,
  },
  drawerHeaderText: {
    color: '#512DA8',
    fontSize: 24,
    fontWeight: 'bold',
  }, 
});