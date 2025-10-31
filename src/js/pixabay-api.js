import axios from 'axios';

const API_KEY = '52981451-85a14668d3ac889bbcbd31730';

export async function getImagesByQuery(query = '', page = 1) {
  const { data } = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return data;
}
