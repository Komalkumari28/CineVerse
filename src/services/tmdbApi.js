import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const IMAGES = {
  poster: (path) => `https://image.tmdb.org/t/p/w500${path}`,
  backdrop: (path) => `https://image.tmdb.org/t/p/original${path}`,
  cast: (path) => `https://image.tmdb.org/t/p/w185${path}`,
};

export const fetchMovies = async (endpoint, params = {}) => {
  try {
    const response = await tmdbApi.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw error;
  }
};

export const endpoints = {
  trending: '/trending/all/day',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  tvPopular: '/tv/popular',
  search: '/search/multi',
  genres: '/genre/movie/list',
  movieDetails: (id) => `/movie/${id}`,
  tvDetails: (id) => `/tv/${id}`,
  credits: (id, type) => `/${type}/${id}/credits`,
  videos: (id, type) => `/${type}/${id}/videos`,
  similar: (id, type) => `/${type}/${id}/similar`,
};

export default tmdbApi;
