import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=8ce756d0e7bb89756eb58e8bc149993b';

//Get Popular Movies
export async function getPopularMovies() {
  const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return response.data.results;
}

//Get Upcoming Movies
export async function getUpcomingMovies() {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
}

//Get Popular TV
export async function getPopularTv() {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return response.data.results;
}
