import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;

    return (
      <TouchableOpacity onPress={() => handlePress()} style={styles.container}>
        <Icon name={'play'} size={30} color={Colors.white}></Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    alignContent: 'center',
    padding: 10,
    paddingLeft: 13,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    zIndex: 0.5,
  },
});

export default PlayButton;
