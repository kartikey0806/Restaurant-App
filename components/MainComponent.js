import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { View, Platform, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CustomSidebarMenu from './CustomSidebarMenu' 
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from'./ReservationComponent';
import Favorites from './FavoriteComponent';
import History from './OrderHistoryComponent';
import Login from './LoginComponent';
import Start from './StartComponent';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
    navigationOptions:({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft: () => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10 }}
        onPress={ () => navigation.toggleDrawer() } />,   
    })},
    Dishdetail: { screen: Dishdetail,
    navigationOptions: {
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
    }},
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft:() => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const AboutNavigator = createStackNavigator({
    About: { screen: About,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft: () =><Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft:() => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft:() => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const HistoryNavigator = createStackNavigator({
    History: { screen: History,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft:() => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const FavoriteNavigator = createStackNavigator({
    Favorite: { screen: Favorites,
    navigationOptions: ({navigation}) => ({
      headerStyle: { backgroundColor: '#512DA8'},
      headerTintColor: '#fff',
      headerTitleStyle: { color: '#fff' },
      headerLeft:() => <Icon name="menu" size={30} 
        color= 'white' style={{ paddingLeft: 10}}
        onPress={ () => navigation.toggleDrawer() } />
    })},
})

const LoginNavigator = createStackNavigator({
  Profile: { screen: Login,
  navigationOptions: ({navigation}) => ({
    headerStyle: { backgroundColor: '#512DA8'},
    headerTintColor: '#fff',
    headerTitleStyle: { color: '#fff' },
    headerLeft:() => <Icon name="menu" size={30} 
      color= 'white' style={{ paddingLeft: 10}}
      onPress={ () => navigation.toggleDrawer() } />
  })},
})

const StartNavigator = createSwitchNavigator({
  Start: { screen: Start}
})

const MainNavigator = createBottomTabNavigator({
  Home:  { screen: HomeNavigator},
  Menu:  { screen: MenuNavigator},
  About: { screen: AboutNavigator },
  Contact:  { screen: ContactNavigator },
  Reservation: { screen: ReservationNavigator },
  History: { screen: HistoryNavigator },
  Favorite: { screen: FavoriteNavigator },
  Login: { screen: LoginNavigator },
  Start: { screen: StartNavigator }
}, {
  contentComponent: CustomSidebarMenu, initialRouteName: 'Favorite'
})

const MainsNavigator = createDrawerNavigator({
  Home:  { screen: HomeNavigator},
  Menu:  { screen: MenuNavigator},
  About: { screen: AboutNavigator },
  Contact:  { screen: ContactNavigator },
  Reservation: { screen: ReservationNavigator },
  History: { screen: HistoryNavigator },
  Favorite: { screen: FavoriteNavigator },
  Login: { screen: LoginNavigator },
  Start: { screen: StartNavigator }
}, {
  contentComponent: CustomSidebarMenu, initialRouteName: 'Favorite'
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ?/*IOS ---> */ 0 : /*Android ----> */ 0 }}>
        <StatusBar color="white"/>
        <AppsContainer />
      </View>
    );
  }
}
  
const AppContainer = createAppContainer(MainNavigator);
const AppsContainer = createAppContainer(MainsNavigator);

export default connect(mapStateToProps, mapDispatchToProps)(Main);