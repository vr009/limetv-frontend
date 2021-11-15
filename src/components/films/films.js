import {showErrors} from '../utils/errors.js';
import {serverLocate} from '../../utils/locale.js';
import listPug from '../pages/films/films.pug';
import firstFilmPug from '../pages/films/firstFilm.pug';
import '../pages/films/films.css';

import Router from '../../utils/router';
/**
 * Модуль создания экрана фильмов
 * @function
 */
export const createFilms = () => {
  createBase();
};

const createBase = () => {
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';
  const first = document.createElement('div');
  first.setAttribute('id', 'first-root');
  stuff.appendChild(first);

  const test = document.createElement('div');
  test.setAttribute('class', 'selection');

  const recommended = document.createElement('div');
  recommended.setAttribute('id', 'rec-root');
  recommended.setAttribute('class', 'selection-film');
  test.appendChild(recommended);

  const popular = document.createElement('div');
  popular.setAttribute('id', 'pop-root');
  popular.setAttribute('class', 'selection-film');
  test.appendChild(popular);

  const newest = document.createElement('div');
  newest.setAttribute('id', 'new-root');
  newest.setAttribute('class', 'selection-film');
  test.appendChild(newest);
  stuff.appendChild(test);

  showFilmsList('/selection', 'rec-root', 'Рекомендуем к просмотру');
  showFilmsList('/selection/newest', 'pop-root', 'Популярное на Lime TV');
  showFilmsList('/selection/hottest', 'new-root', 'Новое на Lime TV');
};


const showFilmsList = (relUrl, rootId, title) => {
  const url = serverLocate+'/films'+relUrl;
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.getElementById(rootId);
        root.innerHTML = listPug({
          title: title,
          films: result,
        });
        if (rootId === 'new-root') {
          const tRoot = document.getElementById('first-root');
          tRoot.innerHTML = firstFilmPug({
            films: result[0],
          });
          const playBtn = document.querySelector('.play-text');
          playBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/player/' + result[0].src[0]);
          });
          const firstfilm = document.getElementById(result[0].id);
          firstfilm.addEventListener('click', function(ev) {
            ev.preventDefault();
            Router.go('/film/' + result[0].id);
          });
        }
        for (let i = 1; i < result.length; i++) {
          const film = document.getElementById(result[i].id);
          film.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/film/' + result[i].id.toString());
          });
        }
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};
