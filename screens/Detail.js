import React, {useSate, useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {getMovies} from '../services/service';
import Error from '../components/Error';
import StarRatings from 'react-native-star-view';
import moment from 'moment';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeHolderImage = require('../assets/images/placeholder.png');
const dimensionScreenHeight = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieID = route.params.movieDetailsId;
  const [movieDetails, setMovieDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getMovies(movieID)
      .then(movieData => {
        setMovieDetails(movieData);
        setLoading(true);
      })
      .catch(err => setError(err));
  }, [movieID]);

  return (
    <React.Fragment>
      {loading && !error && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.ImageStyles}
              source={
                movieDetails.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetails.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetails.title}</Text>

              {movieDetails.genres && (
                <View style={styles.genresContainer}>
                  {movieDetails.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={styles.genresText}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRatings score={movieDetails.vote_average / 2} />
              <Text style={styles.overviewText}>{movieDetails.overview}</Text>
              <Text style={styles.releaseText}>
                {'Release Date:   ' +
                  moment(movieDetails.release_date).format('MMMM Do, YYYY')}
              </Text>
            </View>
          </ScrollView>

          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.modalContainer}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
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

  ImageStyles: {
    height: 100,
    height: dimensionScreenHeight / 2,
  },

  movieTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },

  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  genresText: {
    marginRight: 10,
    fontWeight: 'bold',
  },

  overviewText: {
    padding: 15,
  },

  releaseText: {
    fontWeight: 'bold',
  },

  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
