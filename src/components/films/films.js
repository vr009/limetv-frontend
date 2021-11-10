import {showErrors} from '../utils/errors.js';
import {createFilmPage} from '../film/film_page.js';
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

  const recommended = document.createElement('div');
  recommended.setAttribute('id', 'rec-root');
  stuff.appendChild(recommended);

  const popular = document.createElement('div');
  popular.setAttribute('id', 'pop-root');
  stuff.appendChild(popular);

  const newest = document.createElement('div');
  newest.setAttribute('id', 'new-root');
  stuff.appendChild(newest);

  showFilmsList('/selection', 'rec-root', 'Рекомендуем к просмотру');
  showFilmsList('/selection/newest', 'pop-root', 'Популярное на Lime TV');
  showFilmsList('/selection/hottest', 'new-root', 'Новое на Lime TV');
  showFilmsList('/selection', 'first-root', 'Рекомендуем к просмотру');
};


const showFilmsList = (relUrl, rootId, title) => {
    const url = 'http://127.0.0.1:8000/films'+relUrl;
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
            if (rootId === 'first-root') {
                const root = document.getElementById('first-root');
                root.innerHTML = firstFilmPug({
                    films: result[0],
                });
                result.splice(0);
            }
            for (let i = 0; i < result.length; i++) {
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

