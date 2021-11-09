import {showErrors} from '../utils/errors.js';
import {createFilmPage} from '../film/film_page.js';
import listPug from '../pages/films/films.pug';

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
            for (let i = 0; i < result.length; i++) {
                const film = document.getElementById(result[i].id);
                film.addEventListener('click', function(event) {
                    const {target} = event;
                    event.preventDefault();
                    createFilmPage(result[i].id);
                });
            }
        },
    ).catch((error) => {
            console.log(error);
            showErrors(error);
        },
    );
};

