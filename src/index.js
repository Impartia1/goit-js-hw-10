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
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
});

// Обробник події зміни вибраної опції у селекті порід
const breedSelect = document.querySelector('select.breed-select');
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      showCatInfo(cat);
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
    });
});









































// const url = `https://api.thecatapi.com/v1/breeds`;
// const api_key ='live_ZwtdVVmq75qDAnNdIkPEL2JRy2O3vpU1TfgoghmTQxNEfWyXdWmUQ7dJ7UUpUHIc';
// let storedBreeds = [];

// fetch(url, {headers: {
//   'x-api-key': api_key,
//   },
// })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//           //filter to only include those with an `image` object
//     data = data.filter(img => img.image?.url != null);

//     storedBreeds = data;

//     for (let i = 0; i < storedBreeds.length; i++) {
//       const breed = storedBreeds[i];
//       let option = document.createElement('option');

//             //skip any breeds that don't have an image
//       if (!breed.image) continue;

//             //use the current array index
//       option.value = i;
//       option.innerHTML = `${breed.name}`;
//       document.querySelector('.breed-select').appendChild(option);
//     }
      
//           //    show the first breed by default
//           // showBreedImage(0);
//           // showBreedImage(10);
//   })
//     .catch(function (error) {
//       console.log(error);
//     });
//   function showBreedImage(index) {
//     const divRef = document.querySelector('.cat-info');
//     const imgElement = divRef.querySelector('img');

//     if (imgElement) {
//       imgElement.src = storedBreeds[index].image.url;
//     }
//     else {
//       let imgRef = document.createElement('img');

//       document.querySelector('.cat-info').appendChild(imgRef);
//       imgRef.src = storedBreeds[index].image.url;
//     }

//     document.getElementById('temperament').textContent = storedBreeds[index].temperament;

//     document.getElementById('decsription').textContent = storedBreeds[index].description;
//   }
//   document.querySelector('.breed-select').addEventListener('change', () => {
//     const selectedBreedId = document.querySelector('.breed-select').value;

//     fetchCatByBreed(selectedBreedId)
//     .then(cat => {
//       showBreedImage(cat);
//     })
//     .catch(error => {
//       console.error('Error fetching cat:', error);
//     });
//   });