import axios from 'axios';

const apiKey = '38984899-fb7c4ed0e683a5a58fd4e2d52';

export const fetchImages = (query, page = 1) => {
  const perPage = 12;
  const apiUrl = 'https://pixabay.com/api/';

  return axios
    .get(apiUrl, {
      params: {
        key: apiKey,
        q: query,
        page: page,
        per_page: perPage,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка при отриманні даних:', error);
      return [];
    });
};
