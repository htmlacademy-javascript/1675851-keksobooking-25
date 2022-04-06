import {isEscapeKey} from './util.js';

const onNoticeClick = () => {
  closeNotice();
};

const onNoticeEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeNotice();
  }
};

function closeNotice() {
  const noticePopup = document.querySelector('.success, .error');

  noticePopup.remove();

  document.removeEventListener('click', onNoticeClick);
  document.removeEventListener('keydown', onNoticeEscKeydown);
}

const showSuccessNotice = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  const successNotice = successContainer.cloneNode(true);

  document.body.append(successNotice);

  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);
};

const showErrorNotice = (message) => {
  const errorContainer = document.querySelector('#error').content.querySelector('.error');
  const errorNotice = errorContainer.cloneNode(true);
  const errorMessage = errorContainer.querySelector('.error__message');

  errorMessage.textContent = message;

  document.body.append(errorNotice);

  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);
};

export {showSuccessNotice, showErrorNotice};
