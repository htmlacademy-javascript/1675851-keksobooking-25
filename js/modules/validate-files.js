const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const DEFAULT_IMAGE_URL = 'img/muffin-grey.svg';
const DEFAULT_IMAGE_ALT = 'Аватар пользователя';
const DEFAULT_IMAGE_WIDTH = 40;
const DEFAULT_IMAGE_HEIGHT = 44;
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

const avatar = document.querySelector('[name="avatar"]');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const housingPhoto = document.querySelector('[name="images"]');
const housingPhotoPreview = document.querySelector('.ad-form__photo');

const createDefaultImage = (place) => {
  const defaultImage = document.createElement('img');

  defaultImage.src = DEFAULT_IMAGE_URL;
  defaultImage.setAttribute('width', `${DEFAULT_IMAGE_WIDTH}`);
  defaultImage.setAttribute('height', `${DEFAULT_IMAGE_HEIGHT}`);
  defaultImage.alt = DEFAULT_IMAGE_ALT;

  place.append(defaultImage);
};

const resetPreview = (place) => {
  place.textContent = '';
  place.classList.remove('added');
};

const resetAvatar = () => {
  resetPreview(avatarPreview);
  createDefaultImage(avatarPreview);
};

const resetHousingPhoto = () => {
  resetPreview(housingPhotoPreview);
};

const resetPreviews = () => {
  resetAvatar();
  resetHousingPhoto();
};

const createPreviews = (input, place) => {
  const files = Array.from(input.files);
  const filenames = files.map((file) => file.name.toLowerCase());
  const matches = filenames.every((item) => FILE_TYPES.some((it) => item.endsWith(it)));

  if (matches) {
    place.textContent = '';

    files.forEach((item) => {
      const preview = document.createElement('img');

      preview.setAttribute('width', `${IMAGE_WIDTH}`);
      preview.setAttribute('height', `${IMAGE_HEIGHT}`);
      preview.src = URL.createObjectURL(item);

      place.append(preview);
    });

    place.classList.add('added');
  }
};

const validatePreviews = () => {
  avatar.addEventListener('change', () => {
    createPreviews(avatar, avatarPreview);
  });

  housingPhoto.addEventListener('change', () => {
    createPreviews(housingPhoto, housingPhotoPreview);
  });
};

export {validatePreviews, resetPreviews};
