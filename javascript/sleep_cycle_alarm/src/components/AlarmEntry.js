import _ from 'lodash';
import React, { Component } from 'react';
import {
  Switch,
  View,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { toggleAlarm, toggleSelection, editAlarm } from '../actions';
import { enabledColor, disabledColor } from '../Colors';
import { EDIT_MODE } from '../Modes';
import ListEntry from './reusable/ListEntry';
import AlarmInfoText from './AlarmInfoText';
import ToggleButton from './reusable/ToggleButton';

class AlarmEntry extends Component {
  state = {
    selected: false
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  toggleAlarm() {
    this.props.toggleAlarm(this.props.alarm);
  }

  toggleSelect() {
    this.setState({
      selected: !this.state.selected
    });
  }

  editEntry() {
    const { editMode, alarm } = this.props;

    if (!editMode) {
      return;
    }

    this.props.editAlarm(alarm);
  }

  renderSwitch() {
    const { editMode, alarm } = this.props;

    if (!editMode) {
      return (
        <Switch
          style={styles.switchButtonStyle}
          onTintColor={enabledColor}
          onValueChange={() => this.toggleAlarm()} value={alarm.enabled} />
      );
    }

    return (
        <Image
          style={styles.imageStyle}
          source={require('../../assets/img/arrow-right.png')}
        />
    );
  }

  render() {
    const { alarm } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.editEntry()}>
        <View>
          <ListEntry id={alarm.id}>
            <ToggleButton
             style={styles.toggleButtonStyle}
             enabled={this.props.editMode}
             selected={this.props.isSelected}
             onPress={() => this.props.toggleSelection(alarm.id)}
            />
            <View style={styles.innerContainerStyle}>
              <AlarmInfoText
                fireDate={alarm.fireDate}
                adjustedDate={alarm.adjustedDate}
                enabled={alarm.enabled}
                sound={alarm.sound} />
              {this.renderSwitch()}
            </View>
          </ListEntry>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  innerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  switchButtonStyle: {
    backgroundColor: disabledColor,
    borderRadius: 18
  },
  imageStyle: {
    width: 8,
    height: 16,
    position: 'relative',
    right: -8
  },
  toggleButtonStyle: {
    position: 'relative',
    left: -20
  }
};

const mapStateToProps = ({ alarms, mode, selected }, ownProps) => {
  const id = ownProps.id;
  const alarm = _.find(alarms, { id });
  const editMode = (mode === EDIT_MODE);
  const isSelected = !!selected[id];

  return {
    alarm,
    editMode,
    isSelected
  };
};

export default connect(mapStateToProps, {
  toggleAlarm,
  toggleSelection,
  editAlarm
})(AlarmEntry);
