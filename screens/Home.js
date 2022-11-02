import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getCrimeMovies,
} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensionScreen = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getData()
      .then(
        ([
          popularMoviesData,
          upcomingMoviesData,
          popularTvData,
          familyMoviesData,
          crimeMoviesData,
        ]) => {
          setPopularMovies(popularMoviesData);
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setCrimeMovies(crimeMoviesData);
          setLoading(true);
        },
      )
      .catch(err => setError(err))
      .finally(() => setLoading(true));

    return () => controller.abort();
  }, []);

  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getUpcomingMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getCrimeMovies(),
    ]);
  };

  return (
    <React.Fragment>
      {loading && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.container}>
              <SliderBox
                images={moviesImages}
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensionScreen.height / 1.5}
              />
            </View>
          )}

          {/* Popular Movies */}
          {popularMovies && (
            <View style={styles.carouselContainer}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}

          {/* Popular TV Shows */}
          {popularTv && (
            <View style={styles.carouselContainer}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}

          {/* Family Movies */}
          {familyMovies && (
            <View style={styles.carouselContainer}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}

          {/* Crime Movies */}
          {crimeMovies && (
            <View style={styles.carouselContainer}>
              <List
                navigation={navigation}
                title="Crime Movies"
                content={crimeMovies}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {error && <Error />}
    </React.Fragment>
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

  sliderStyle: {
    height: 0,
  },

  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
});

export default Home;
