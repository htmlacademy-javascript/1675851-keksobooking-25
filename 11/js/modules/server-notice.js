import {isEscapeKey} from './util.js';

const onNoticeClick = () => {
  closeNotice();
};

const onNoticeEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeNotice();
  }
};

const addNoticeAndListeners = (element) => {
  document.body.append(element);

  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);
};

const removeNoticeAndListeners = (element) => {
  element.remove();

  document.removeEventListener('click', onNoticeClick);
  document.removeEventListener('keydown', onNoticeEscKeydown);
};

function closeNotice() {
  const noticePopup = document.querySelector('.success, .error');

  removeNoticeAndListeners(noticePopup);
}

const showSuccessNotice = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  const successNotice = successContainer.cloneNode(true);

  addNoticeAndListeners(successNotice);
};

const showErrorNotice = (message) => {
  const errorContainer = document.querySelector('#error').content.querySelector('.error');
  const errorNotice = errorContainer.cloneNode(true);
  const errorMessage = errorContainer.querySelector('.error__message');

  errorMessage.textContent = message;

  addNoticeAndListeners(errorNotice);
};

export {showSuccessNotice, showErrorNotice};
