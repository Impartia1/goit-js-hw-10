import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Функція для заповнення селекту зі списком порід
function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

// Функція для відображення інформації про кота
function showCatInfo(cat) {
  const catInfoDiv = document.querySelector('.cat-info');
  catInfoDiv.innerHTML = '';

  const imageElement = document.createElement('img');
  imageElement.src = cat[0].url;
  catInfoDiv.appendChild(imageElement);

  const newDivForInfo = document.createElement('div');
  newDivForInfo.classList.add('text-info');
  catInfoDiv.appendChild(newDivForInfo);

  const nameElement = document.createElement('h1');
  nameElement.textContent = `${cat[0].breeds[0].name}`;
  newDivForInfo.appendChild(nameElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `${cat[0].breeds[0].description}`;
  newDivForInfo.appendChild(descriptionElement);

  const temperamentElement = document.createElement('p');
  temperamentElement.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;
  newDivForInfo.appendChild(temperamentElement);

  breedSelect.style.display = 'block';
}

// Отримання списку порід при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  breedSelect.style.display = 'none';
  loaderElement.style.display = 'block';
  loaderElement.textContent = 'Loading data, please wait...';
  errorElement.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);

      breedSelect.style.display = 'block';
      loaderElement.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      errorElement.style.display = 'block';
      errorElement.textContent = 'Error loading data.';
      loaderElement.style.display = 'none';
    });
});

// Обробник події зміни вибраної опції у селекті порід
const breedSelect = document.querySelector('select.breed-select');
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');
  const catInfoDiv = document.querySelector('.cat-info');

  loaderElement.style.display = 'block';
  loaderElement.textContent = 'Loading cat information...';
  errorElement.style.display = 'none';
  catInfoDiv.innerHTML = '';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      showCatInfo(cat);
      loaderElement.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      errorElement.style.display = 'block';
      errorElement.textContent = 'Error loading cat information.';
      loaderElement.style.display = 'none';
    });
});



