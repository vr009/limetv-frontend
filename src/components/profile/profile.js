import {fetchRequest} from '../network/fetch.js';
import {serverLocate} from '../../utils/locale.js';
import {fetchImage} from '../network/image.js';
import {showErrors} from '../utils/errors.js';
import avatarPug from "../pages/menu/avatar.pug";
import profilePug from "../pages/profile/profile.pug";

export const createProfile = (profile) => {
  const avatar = document.getElementById('new_avatar');
  avatar.addEventListener('click', createFileInput);

  const text = document.querySelector('textarea');
  text.addEventListener('keydown', submitBio);

  const form = document.getElementById('profile-info-pass__form');
  form.addEventListener('submit', updateUserPassword);

  const form2 = document.getElementById('profile-info-bio__form');
  form2.addEventListener('submit', updateUserBio);
};

/**
 * Cоздает секретное поле для загрузки файла
 * */
const createFileInput = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jpg, .jpeg, .png';
  input.addEventListener('change', updateUserPic);
  input.click();
};

/**
 * Отправляет загруженный файл на сервер
 * При успехе меняет картинку
 * @param event
 */
const updateUserPic = (event) => {
  event.preventDefault();
  const target = event.target;
  const reader = new FileReader();
  if (target.files && target.files.length > 0) {
    reader.onload = (evt) => {
      const data = new FormData();
      data.append('pic', target.files[0]);
      const url = serverLocate+'/users/profile/settings/pic';
      fetchImage(url, data).then((result)=>{
        if (!result.ok) {
          throw error;
        }
        showErrors('Успешно');
      }).catch(function(error) {
        showErrors('Не обновлено');
      });
    };
    reader.readAsDataURL(target.files[0]);
    const userpic = document.getElementById('avatar');
    userpic.src = target.files[0].name;
  }
};

/**
 * Обновление пароля пользователя
 */
const updateUserPassword = (event) => {
  event.preventDefault();
  const form = document.getElementById('profile-info-pass__form');
  const password = form.querySelector('input').value;

  if (password !== '' && password !== undefined) {
    const data = {
      'password': password,
    };
    const url = serverLocate+'/users/profile/settings/pass';
    fetchRequest(url, 'POST', data).then(
        (response) => {
          if (response.ok) {
            console.log('updated');
          } else {
            throw error;
          }
        },
    ).catch(function(error) {
      console.log('not updated');
    });
  }
};

/**
 * Обновление описания пользователя
 * @param event
 */
const updateUserBio = (event) => {
  event.preventDefault();
  const form = document.getElementById('profile-info-bio__form');
  const bio = form.querySelector('textarea').value;
  if (bio !== '' && bio !== undefined) {
    const data = {
      'about': bio,
    };
    const url = serverLocate+'/users/profile/settings/bio';
    fetchRequest(url, 'POST', data).then(
        (response) => {
          if (response.ok) {
            console.log('updated');
          } else {
            throw error;
          }
        },
    ).catch(function(error) {
      console.log('not updated');
    });
  }
};

const submitBio = (event) => {
  if (event.code === 'Enter' ) {
    event.target.form.dispatchEvent(new Event('submit', {cancelable: true}));
    // не убирать, иначе ничего не напечатается в поле
    event.preventDefault();
  }
};
