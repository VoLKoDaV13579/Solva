import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const getCharacters = (page: number) => axios.get(`${BASE_URL}/people/?page=${page}`);
export const getCharacterDetails = (name: string) => axios.get(`${BASE_URL}/people/?search=${name}`);
export const getPlanets = (page: number) => axios.get(`${BASE_URL}/planets/?page=${page}`);
export const getPlanetDetails = (name: string) => axios.get(`${BASE_URL}/planets/?search=${name}`);
export const getStarships = (page: number) => axios.get(`${BASE_URL}/starships/?page=${page}`);
export const getStarshipsDetails = (name: string) => axios.get(`${BASE_URL}/starships/?search=${name}`);
