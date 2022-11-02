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

//Get Family Movies
export async function getFamilyMovies() {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
}

//Get Crime Movies
export async function getCrimeMovies() {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=80`,
  );
  return response.data.results;
}

//Get Movies
export async function getMovies(id) {
  const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return response.data;
}

//Search Movies/TV by keyword
export async function searchMovieTv(query, type) {
  const response = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return response.data.results;
}
