import React, { Component } from 'react';
import { Text, ScrollView, View, Animated, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require('../images/uthappizza.png')}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView>
      <Animatable.View animation="fadeInDown" duration={1500}>
      
        <Card
          featuredTitle="Uthappizza"
          image={require('../images/uthappizza.png')}>
          <Text style={{ margin: 10, textAlign: 'center' }}>
            A unique combination of Indian Uthappam (pancake) and Italian pizza,
            topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia
            onion, Guntur chillies and Buffalo Paneer.
          </Text>
        </Card>

        <Card
          featuredTitle="Weekend's Grand Buffet"
          featuredSubtitle="Special Offer"
          image={require('../images/buffet.png')}>
          <Text style={{ margin: 10, textAlign: 'center' }}>
            Featuring mouthwatering combinations with a choice of five different
            salads, six enticing appetizers, six main entrees and five choicest
            desserts. Free flowing bubbly and soft drinks. All for just $19.99
            per person
          </Text>
        </Card>
        
        <Card
          featuredTitle="Alberto Sommayya"
          featuredSubtitle="Executive Chef"
          image={require('../images/alberto.png')}>
          <Text style={{ margin: 10, textAlign: 'center' }}>
            Award winning three-star Michelin chef with wide International
            experience having worked closely with whos-who in the culinary
            world, he specializes in creating mouthwatering Indo-Italian fusion
            experiences. He says, Put together the cuisines from the two
            craziest cultures, and you get a winning hit! Amma Mia!
          </Text>
        </Card>
        
      </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
