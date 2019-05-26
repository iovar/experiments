import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  DatePickerIOS,
  Picker
} from 'react-native';
import ModalConfirm from './reusable/ModalConfirm';
import {
  textColor,
  borderColor,
  enabledColor
} from '../Colors';

import Sound from 'react-native-sound';
// enables playback in silent mode
Sound.setCategory('Playback');

import SOUNDS from '../Sounds';
const sounds = _.keys(SOUNDS);

class AlarmProperties extends Component {
  state = {
    dateModal: false,
    fireDate: new Date(this.props.fireDate),
    soundModal: false,
    sound: this.props.sound
  };

  formatTime() {
    const { fireDate } = this.props;
    const time = moment(fireDate).local().format('HH:mm');

    return `${time}`;
  }

  stopSound() {
    if (this.lastSound) {
      this.lastSound.stop();
      this.lastSound.release();
    }
  }

  playSound(sound) {
    this.stopSound();

    this.lastSound = new Sound(sound, Sound.MAIN_BUNDLE, () => this.lastSound.play());
  }

  onSoundChange(sound) {
    this.setState({ sound });
    this.playSound(SOUNDS[sound]);
  }

  toggleDateModal() {
    this.setState({ dateModal: !this.state.dateModal })
  }

  toggleSoundModal() {
    this.setState({ soundModal: !this.state.soundModal })
  }

  renderDateModal() {
    return this.state.dateModal ? (
      <ModalConfirm
       height={260}
       actionOk={() => {
         this.fireOnChange({fireDate: this.state.fireDate.getTime()});
         this.setState({ dateModal: false });
       }}
       textConfirm="Set"
       actionCancel={() => {
         this.setState({ dateModal: false });
       }}>
        <DatePickerIOS
          style={styles.datePickerStyle}
          date={this.state.fireDate}
          mode='time'
          minuteInterval={10}
          textColor={textColor}
          onDateChange={(fireDate) => this.setState({ fireDate })}
        />

      </ModalConfirm>
    ) : null;
  }

  renderSoundModal() {
    return this.state.soundModal? (
      <ModalConfirm
       height={260}
       actionOk={() => {
         this.stopSound();
         this.fireOnChange({sound: this.state.sound});
         this.setState({ soundModal: false });
       }}
       textConfirm="Set"
       actionCancel={() => {
         this.stopSound();
         this.setState({ soundModal: false });
       }}>
        <Picker
          style={styles.datePickerStyle}
          selectedValue={this.state.sound}
          onValueChange={(sound) => this.onSoundChange(sound)}
          textColor={textColor}
        >
          {_.map(sounds, (sound) => (
              <Picker.Item label={sound} value={sound} key={sound} />
            )
          )}

        </Picker>

      </ModalConfirm>
    ) : null;
  }

  fireOnChange(newProps) {
    const { fireDate, sound, snooze, onChange } = this.props;

    if (onChange) {
      onChange({
        fireDate,
        sound,
        snooze,
        ...newProps
      });
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity onPress={() => this.toggleDateModal()}>
            <View style={styles.entryStyle}>
                <Text style={styles.textStyle}>
                  Wake-up by:
                </Text>
                <Text style={[styles.textStyle, styles.emphasizedText]}>
                  {this.formatTime()}
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleSoundModal()}>
            <View style={styles.entryStyle}>
                <Text style={styles.textStyle}>
                  Alarm sound:
                </Text>
                <Text style={[styles.textStyle, styles.emphasizedText]}>
                  {this.props.sound}
                </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {this.renderDateModal()}
        {this.renderSoundModal()}
      </View>
    )
  }
}

const styles = {
  entryStyle: {
    height: 64,
    borderBottomWidth: 1,
    borderColor: borderColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: textColor,
    fontSize: 18,
  },
  emphasizedText: {
    fontWeight: 'bold',
  },
  datePickerStyle: {
    backgroundColor: textColor,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: enabledColor,
    shadowOffset: { width: 0, height: 0 },
    width: 230,
    marginLeft: -4,
    height: 200,
    borderRadius: 4
  }
};

export default AlarmProperties;
