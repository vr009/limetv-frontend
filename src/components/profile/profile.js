import {fetchRequest} from '../network/fetch.js';
import {serverLocate} from '../../utils/locale.js';
import {fetchImage} from '../network/image.js';
import {showErrors, showSuccess} from '../utils/errors.js';
import {validators} from "../utils/validate";

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
        const err = document.getElementById('error');
        err.innerHTML = '';
        showSuccess('Успешно');
        // перегружаем аватарку
        const url = serverLocate+'/users/profile';
        fetchRequest(url, 'GET', null).then((res) => {
          return res.ok ? res : Promise.reject(res);
        },
        ).then((response) => {
          return response.json();
        },
        ).then((result) => {
          const userPic = document.getElementById('avatar');
          const newUserPic = document.getElementById('profile-info-avatar');
          userPic.src = result.avatar;
          newUserPic.src = result.avatar;
        },
        ).catch(function() {
          showErrors('Ошибка отправки запроса');
        });
      }).catch(function() {
        const suc = document.getElementById('success');
        suc.innerHTML = '';
        showErrors('Большой размер фотографии');
      });
    };
    reader.readAsDataURL(target.files[0]);
  }
};

/**
 * Обновление пароля пользователя
 */
const updateUserPassword = (event) => {
  event.preventDefault();
  const form = document.getElementById('profile-info-pass__form');
  const password = form.querySelector('input').value;
  if (!validators.password(password)) {
    showErrors('Пароль должен быть от 6 до 16 символов. ');
  } else if (password !== '' && password !== undefined) {
    const data = {
      'password': password,
    };
    const url = serverLocate+'/users/profile/settings/pass';
    fetchRequest(url, 'POST', data).then(
        (response) => {
          if (response.ok) {
            console.log('updated');
            const err = document.getElementById('error');
            err.innerHTML = '';
            showSuccess('Пароль обновлен');
          } else {
            throw error;
          }
        },
    ).catch(function() {
      console.log('not updated');
      const suc = document.getElementById('success');
      suc.innerHTML = '';
      showErrors('Пароль не обновлен');
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
            const err = document.getElementById('error');
            err.innerHTML = '';
            showSuccess('Сохранено');
          } else {
            throw error;
          }
        },
    ).catch(function(error) {
      console.log('not updated');
      const suc = document.getElementById('success');
      suc.innerHTML = '';
      showErrors('Не сохранено');
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
