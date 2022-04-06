const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data',
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
    'https://25.javascript.pages.academy/keksobooking',
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
