import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
  galleryList.innerHTML = images
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
            <a href=${largeImageURL}><img src="${webformatURL}" alt="${tags}" width='360' class="image-icon"/></a>
            <ul class="image-descriptions">
              <li class="image-text">Likes <br><span>${likes}</span></li>
              <li class="image-text">Views <br><span>${views}</span></li>
              <li class="image-text">Comments <br><span>${comments}</span></li>
              <li class="image-text">Downloads <br><span>${downloads}</span></li>
            </ul>
        </li>`
    )
    .join('');
  let gallery = new SimpleLightbox('.image-pixabay a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 1.0,
  });
  gallery.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}
