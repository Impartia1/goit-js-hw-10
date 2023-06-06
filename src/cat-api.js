function handleRequest(url) {
  const breedSelectElement = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  breedSelectElement.style.display = 'none';
  loaderElement.style.display = 'block';
  errorElement.style.display = 'none';

  return fetch(url, {
      headers: {
        'x-api-key': 'live_ZwtdVVmq75qDAnNdIkPEL2JRy2O3vpU1TfgoghmTQxNEfWyXdWmUQ7dJ7UUpUHIc' // Замініть 'YOUR_API_KEY_HERE' на свій ключ API
      }
    })
    .then(response => {
      loaderElement.style.display = 'none';

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      return response.json();
    })
    .catch(error => {
      breedSelectElement.style.display = 'none';
      loaderElement.style.display = 'none';
      errorElement.style.display = 'block';
      console.error('Request error:', error);
      throw error;
    });
}

// Функція для отримання списку порід
export function fetchBreeds() {
  const breedSelectElement = document.querySelector('select.breed-select');

  breedSelectElement.style.display = 'none';

  const url = 'https://api.thecatapi.com/v1/breeds';

  return handleRequest(url)
    .then(breeds => {
      breedSelectElement.innerHTML = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      }).join('');

      breedSelectElement.style.display = 'block';

      return breeds;
    });
}




export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return handleRequest(url);
}