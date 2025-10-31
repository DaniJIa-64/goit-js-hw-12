import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load-more');

let gallery = new SimpleLightbox('.image-pixabay a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 1.0,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="image-pixabay">
            <a href=${largeImageURL}><img src="${webformatURL}" alt="${tags}" class="image-icon"/></a>
            <ul class="image-descriptions">
              <li class="image-text">Likes <br><span>${likes}</span></li>
              <li class="image-text">Views <br><span>${views}</span></li>
              <li class="image-text">Comments <br><span>${comments}</span></li>
              <li class="image-text">Downloads <br><span>${downloads}</span></li>
            </ul>
        </li>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  btnLoad.classList.remove('load-more-hidden');
}

export function hideLoadMoreButton() {
  btnLoad.classList.add('load-more-hidden');
}
