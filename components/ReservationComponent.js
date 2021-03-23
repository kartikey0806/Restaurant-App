import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: '',
      time: ''
    };
  }

  static navigationOptions = {
    title: 'Reserve Table',
  };

  onChange = time => this.setState({ time })

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
  return permission;
}

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for '+ date + ' requested',
      ios: {  sound: true },
      android: {  sound: true, vibrate: true, color: '#512DA8' }
    });
  } 

  handleReservation() {
    this.state({
      guests: this.state.guests,
      date: this.state.date,
      smoking: this.state.smoking
    })
  }

  obtainCalendarPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if ( status === 'granted' ) {
      const calendars = await Calendar.getCalendarsAsync();
      console.log('Here are all your calendars:');
      console.log({ calendars });
    }
  }

  async addReservationToCalendar(date) {
    const startDate = new Date(date);
    const setting = new Date(date);
    const mergeDate = setting.setHours(setting.getHours() + 2);
    const endDate = new Date(mergeDate);
    console.log('starting date ==> ', startDate);
    console.log('end date ==> ', endDate);
    const calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
    if (calendarPermission.status === 'granted') {
      const eventId = await Calendar.createEventAsync(Calendar.DEFAULT, {
        title: 'Con Fusion Table Reservation',
        startDate: startDate,
        endDate: endDate,
        timeZone: 'Asia/Hong_Kong',
        location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
          }).then((res) => {
        console.log('res ==> ', res)
      }).catch(err => console.log('error ==> ', err))
    console.log('event ==> ', eventId)}
    else { console.log('permission not granted!')}
  }
  

  render() {
    return (
      <ScrollView>
      <Animatable.View animation="zoomIn" duration={1000} delay={500}>

        <View style={styles.formRow}>
          <Text style={styles.formLabels}>Date and Time</Text>
          <DatePicker
            style={{  flex: 4 }}
            date={this.state.date}
            format=""
            mode="date"
            placeholder="Select Date and Time"
            minDate="2020-08-10"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{ dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36 } }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />

        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Vegetarian / Non-Vegetarian </Text>
          <Switch
            style={styles.formItems}
            value={this.state.smoking}
            onTintColor="red"
            onValueChange={(value) =>
              this.setState({ smoking: value })
            }>
          </Switch>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue) =>
              this.setState({ guests: itemValue })
            }>
            <Picker.Item label="1" value="1" /><Picker.Item label="2" value="2" /><Picker.Item label="3" value="3" /><Picker.Item label="4" value="4" /><Picker.Item label="5" value="5" /><Picker.Item label="6" value="6" /><Picker.Item label="7" value="7" /><Picker.Item label="8" value="8" /><Picker.Item label="9" value="9" /><Picker.Item label="10" value="10" /><Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" /><Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" /><Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" /><Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" /><Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
          </Picker>
        </View>

        <View style={styles.formRow}>
          <Button
            onPress={() =>
              Alert.alert(
                'Your Reservation OK ? ',
                'No. of Guests: ' + this.state.guests +
                '\nFood: ' + [this.state.smoking ? 'Non-Vegetarian' : 'Vegetarian'] +
                '\nDate and Time: ' + this.state.date,
                [{ text: 'CANCEL', onPress: () => this.resetForm() },
                { text: 'OK', onPress: () => {
                  this.presentLocalNotification(this.state.date);
                  this.addReservationToCalendar(this.state.date);
                  this.resetForm() }}],
                { cancelable: false }
              )
            }
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>

      </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
  },
  formLabel: {
    fontSize: 17,
    flex: 2,
  },
  formItem: {
    flex: 1, 
  },
  formItems: {
    paddingRight: 10
  },
  formLabels: {
    fontSize: 17,
    marginRight: 20
  },
});

export default Reservation;