const ADDRESS_FROM = 'https://25.javascript.pages.academy/keksobooking/data';
const ADDRESS_TO = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(
    ADDRESS_FROM,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return onError('Ошибка загрузки данных с сервера');
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onError('Ошибка загрузки данных с сервера');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    ADDRESS_TO,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        return onError('Не удалось отправить форму. Попробуйте еще раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте еще раз');
    });
};

export {getData, sendData};
