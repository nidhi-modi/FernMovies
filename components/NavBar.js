import React from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};
class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainContainer}>
            <Image
              style={styles.imageLogo}
              source={require('../assets/images/movies.png')}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Icon name={'search-outline'} size={30} color={'#ffffff'} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageLogo: {
    width: 50,
    height: 50,
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
