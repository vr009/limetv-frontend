import {fetchRequest} from '../components/network/fetch.js';
import {showErrors} from '../components/utils/errors.js';
import {createFilm} from '../components/films/single.js';
import {serverLocate} from '../utils/locale.js';

export const createFilmPage = (state) => {
  document.title = 'Film';
  const url = serverLocate+':8000/films/film/'+state.id;

  fetchRequest(url, 'GET', null).then(
      (res) => {
        return res.ok ? res : Promise.reject(res);
      },
  ).then(
      (response) => {
        return response.json();
      },
  ).then(
      (result) => {
        if (result.status === 200) {
          createFilm(result.body);
        } else {
          showErrors('Ошибка обработки запроса');
        }
      },
  ).catch(function(error) {
    showErrors('Ошибка отправки запроса');
  });
};
