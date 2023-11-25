import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const container = document.querySelector('.cat-info');

select.addEventListener('change', onChange);

select.hidden = true;
loader.hidden = false;

fetchBreeds()
  .then(function (data) {
    const markup = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
      select: '#selectElement',
    });
    loader.hidden = true;
    select.hidden = false;
  })
  .catch(error => {
    Report.failure('Oops! Something went wrong! Try reloading the page!');
    loader.hidden = true;
    error.hidden = false;
    container.innerHTML = '';
  })
  .finally(() => loader.classList.add('is-hidden'));

function onChange(evt) {
  loader.hidden = false;
  select.hidden = true;
  fetchCatByBreed(evt.target.value)
    .then(data => {
      const image = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      container.innerHTML = `<img class="js-cat-img" src="${image}" alt="${name}" width="400">
    <div class="js-cat-description">
      <h2 class="js-cat-name">${name}</h2>
      <p>${description}</p>
      <h3 class="js-cat-temp-title">Temperament:</h3>
      <p>${temperament}</p>
    </div>`;

      select.hidden = false;
      loader.hidden = true;
    })
    .catch(err => {
      Report.failure('Oops! Something went wrong! Try reloading the page!');
      console.log(err);
      loader.hidden = true;
      select.hidden = true;
      error.hidden = false;
      container.innerHTML = '';
    });
}
