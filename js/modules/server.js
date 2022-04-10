const adressFrom = 'https://25.javascript.pages.academy/keksobooking/data';
const adressTo = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(
    adressFrom,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError('Ошибка загрузки данных с сервера');
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onError('Ошибка загрузки данных с сервера');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    adressTo,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте еще раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте еще раз');
    });
};

export {getData, sendData};
