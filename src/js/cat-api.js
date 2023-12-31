import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_fdL6xlWqsFm5V20Cax7uW7E5O3DaYN4LqoODu5oEzTfd5ox02fgetcn4Us8q987Z';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get('https://api.thecatapi.com/v1/images/search?breed_ids=' + breedId)
    .then(response => response.data);
}
