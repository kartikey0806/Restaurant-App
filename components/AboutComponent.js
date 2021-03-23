import React from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
import { ListItem, Card, Divider } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History() {
  return (
    <Card title="Our History">
      <Text style={{ paddingTop: 10, fontSize: 13, textAlign: 'center' }}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>
      <Text></Text>
      <Text style={{ fontSize: 13, textAlign: 'center' }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS,
    };
  }

  static navigationOptions = {
    title: 'About Us',
  };

  render() {
    const renderMenuItem = ({ item, index }) => {
      return (
          <ScrollView>
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.description}
              hideChevron={true}
              leftAvatar={{ source: require('../images/alberto.png') }}
            />
          </ScrollView>
      );
    };

    return (
      <ScrollView>
        <Animatable.View animation="fadeInUp" duration={1000} delay={500}>
        <History />
        </Animatable.View>
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
        <Card title="Corporate Leadership">
          <FlatList
            data={this.state.leaders}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
        </Animatable.View>
      </ScrollView>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);