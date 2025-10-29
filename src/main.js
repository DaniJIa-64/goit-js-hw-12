import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
form.addEventListener('submit', formSearch);
hideLoader();

function formSearch(event) {
  event.preventDefault();
  clearGallery();
  if (input.value.trim() === '') {
    iziToast.warning({
      position: 'topRight',
      message: `Please, write search word!`,
    });
    return;
  }
  showLoader();
  getImagesByQuery(input.value.trim())
    .then(({ data }) => {
      if (!data.hits.length) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      createGallery(data.hits);
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        position: 'topRight',
        message: `Sorry, there are no images ${error} matching your search query. Please try again!`,
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
