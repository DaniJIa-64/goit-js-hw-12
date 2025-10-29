import axios from 'axios';

const API_KEY = '52981451-85a14668d3ac889bbcbd31730';

export function getImagesByQuery(query = '') {
  return axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photos',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}
