import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getPopularMovies} from './services/service';

const App = () => {
  const [movies, setMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getPopularMovies()
      .then(movies => {
        setMovies(movies[0]);
      })
      .catch(err => setError(err));

    return () => controller.abort();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{movies.original_title}</Text>
      {error && <Text style={styles.errorText}>Error in the server</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
  },
});

export default App;
