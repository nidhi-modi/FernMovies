import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const placeHolderImage = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {movieDetailsId: item.id})}
        style={styles.touchableOpacityContainer}>
        <Image
          resizeMode="cover"
          style={styles.ImageStyles}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 10,
  },

  ImageStyles: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },

  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10,
  },
});

Card.propTypes = propTypes;

export default Card;
