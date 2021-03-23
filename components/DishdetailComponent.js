import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import * as Animatable from 'react-native-animatable';
import baseUrl from '../shared/baseUrl';

import { postFavorite, postComment } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200)
      return true;
    else
      return false;
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [{ text: 'Cancel' },
          { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } }],
          { cancelable: false });
      else if (recognizeComment(gestureState))
        props.toggleModal();
      return true;
    }
  })

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200)
      return true;
    else
      return false;
  }

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
      },
      { dialogTitle: 'Share ' + title })
  }


  if (dish != null) {
    return (
      <View>
        <Animatable.View animation="fadeInUp" duration={800} delay={500}
          {...panResponder.panHandlers}>
          <Card
            image={require('../images/pizza.jpg')}
            featuredTitle={dish.name}>
            <Text style={{ fontWeight: 'bold' }}>   {dish.category}</Text>
            <Text style={{ margin: 10 }}>{dish.description}</Text>
            <Text>   {dish.price}</Text>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Icon
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type="font-awesome"
                size={23}
                color="#f50"
                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
              />
              <Icon
                raised
                reverse
                name="pencil"
                type="font-awesome"
                color="#512DA8"
                size={23}
                onPress={() => props.toggleModal()}
              />
              <Icon
                raised
                reverse
                name='share'
                type='font-awesome'
                color='#51D2A8'
                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
            </View>
          </Card>
        </Animatable.View>

      </View>
    );
  }
  return null;
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          type="star"
          imageSize={13}
          startingValue={+item.rating}
          readonly
          style={{ alignItems: "flex-start" }}
          fractions={0}
        />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInDown" duration={800} delay={500}>
      <Card title="Comments and Reviews">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
      rating: 5,
      author: '',
      comment: '',
      showModal: false
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  static navigationOptions = {
    title: 'Dish Details ...',
  };

  resetFrom() {
    this.setState({
      rating: 5,
      author: '',
      comment: '',
      showModal: false
    })
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  handleComment(dishId) {
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    this.toggleModal();
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.state.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavourite(dishId)}
          toggleModal={() => this.toggleModal()}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.state.comments.filter((comment) => comment.dishId === dishId)}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetFrom() }}
          onRequestClose={() => { this.toggleModal(); this.resetFrom() }}
        >
          <View style={styles.a}>

            <Rating
              onFinishRating={value => this.setState({ rating: value })}
              type="star"
              ratingCount={5}
              showRating
              startingValue={5}
            />

            <View style={{ margin: 10 }}>
              <Input
                placeholder="Author"
                oonChangeText={value => this.setState({ author: value })}
                leftIcon={{ type: "font-awesome", name: "user-o" }}
              />
              <Input
                onChangeText={value => this.setState({ comment: value })}
                placeholder="Comment"
                leftIcon={{ type: "font-awesome", name: "comment-o" }}
              />
            </View>

            <View style={{ paddingRight: 20, paddingLeft: 20 }}>
              <Button
                title="SUBMIT"
                color="#512DA8"
                onPress={() => this.handleComment(dishId)}
              />
              <Text></Text>
              <Button
                title="CANCEL"
                color="grey"
                onPress={() => { this.toggleModal(); this.resetFrom() }}
              />
            </View>

          </View>
        </Modal>

      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

const styles = StyleSheet.create({
  a: {
    paddingTop: 30,
    height: 1000,
    backgroundColor: '#fff',
  },
})
