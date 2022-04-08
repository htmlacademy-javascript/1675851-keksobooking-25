const NOTICE_SHOW_TIME = 3000;
const DEFAULT_RENDER_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const createErrorNotice = (message) => {
  const errorContainer = document.createElement('div');

  errorContainer.classList.add('error-notice');
  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, NOTICE_SHOW_TIME);
};

function debounce (callback, timeoutDelay = DEFAULT_RENDER_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, createErrorNotice, debounce};
