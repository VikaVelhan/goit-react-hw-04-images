import axios from 'axios';

//const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31938482-76419dff0cedda02808dc9161';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export async function fetchImages(query, page) {
  const resp = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
  if (resp.data.hits.length === 0) {
    throw new Error();
  } else {
    return resp.data;
  }
}
