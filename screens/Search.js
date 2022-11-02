import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/service';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [serachResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onsubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(err => setError(err));
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.formStyle}>
            <TextInput
              placeholder="Search Movie or TV Show"
              style={styles.textInputStyles}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onsubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {serachResults && serachResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={serachResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {serachResults && serachResults.length == 0 && (
            <View style={styles.noResults}>
              <Text style={styles.errorTextColour}>
                No results matching your criteria.
              </Text>
              <Text style={styles.errorTextColour}>
                Try different keywords.
              </Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!serachResults && (
            <View style={styles.empty}>
              <Text style={styles.textColour}>
                Type something to start searching
              </Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInputStyles: {
    height: 50,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 15,
  },

  errorTextColour: {
    color: '#FF0000',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  textColour: {
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 5,
  },

  formStyle: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },

  empty: {
    padding: 5,
  },
});

export default Search;
