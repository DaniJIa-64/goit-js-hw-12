import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const btnLoad = document.querySelector('.btn-load-more');
form.addEventListener('submit', formSearch);
btnLoad.addEventListener('click', btnLoadMore);

let page = 1;
let inputQuery;

async function formSearch(event) {
  event.preventDefault();
  clearGallery();
  page = 1;
  inputQuery = event.target.elements['search-text'].value.trim();
  hideLoadMoreButton();
  if (inputQuery === '') {
    iziToast.warning({
      position: 'topRight',
      message: `Please, write search word!`,
    });
    return;
  }
  showLoader();
  try {
    const data = await getImagesByQuery(inputQuery, page);
    if (!data.hits.length) {
      return iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    endSearchResults(data.totalHits);
    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: `Sorry, there are no images matching your search query. Please try again!`,
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function btnLoadMore() {
  page++;
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(inputQuery, page);
    endSearchResults(data.totalHits);
    createGallery(data.hits);
    const height = document
      .querySelector('.image-pixabay')
      .getBoundingClientRect().height;
    window.scrollBy({
      left: 100,
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: `Sorry, there are no images matching your search query. Please try again!`,
    });
  } finally {
    hideLoader();
  }
}

function endSearchResults(totalPage) {
  if (15 * page >= totalPage) {
    hideLoadMoreButton();
    iziToast.info({
      position: 'topRight',
      message: `We're sorry, but you've reached the end of search results.`,
    });
  } else {
    showLoadMoreButton();
  }
}
