import {showErrors} from '../utils/errors.js';
import {serverLocate} from '../../utils/locale.js';
import listPug from '../pages/films/films.pug';
import firstFilmPug from '../pages/films/firstFilm.pug';
import '../pages/films/films.css';
import Router from '../../utils/router.js';
import carouselGenres from '../pages/genres/carousel_genres.pug';
import filmProfile from '../pages/films/filmsProfile.pug';
import {Genres} from '../utils/validate';

/**
 * Модуль создания экрана фильмов
 * @function
 */
export const createFilms = () => {
  createBase();
};

const createBase = () => {
  if (document.getElementById('stuff') === null) {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const stuff = document.createElement('div');
    stuff.setAttribute('id', 'stuff');
    root.appendChild(stuff);
  }
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';
  stuff.setAttribute('class', 'null');

  // стартовый фильм
  const first = document.createElement('div');
  first.setAttribute('id', 'first-root');
  stuff.appendChild(first);

  // секция каруселей
  const test = document.createElement('div');
  test.setAttribute('class', 'selection');

  // карусель жанров
  const genres = document.createElement('div');
  genres.setAttribute('id', 'carousel-genres');
  genres.setAttribute('class', 'selection-film');
  test.appendChild(genres);

  // карусель рекомендаций
  const recommended = document.createElement('div');
  recommended.setAttribute('id', 'rec-root');
  recommended.setAttribute('class', 'selection-film');
  test.appendChild(recommended);

  // карусель популярного на LimeTV
  const popular = document.createElement('div');
  popular.setAttribute('id', 'pop-root');
  popular.setAttribute('class', 'selection-film');
  test.appendChild(popular);

  // карусель нового на LimeTV
  const newest = document.createElement('div');
  newest.setAttribute('id', 'new-root');
  newest.setAttribute('class', 'selection-film');
  test.appendChild(newest);
  stuff.appendChild(test);

  genres.innerHTML = carouselGenres({
    genres: Genres,
  });

  for (let i = 0; i < Genres.length; i++) {
    const film = document.getElementById(Genres[i].id);
    film.addEventListener('click', function(event) {
      event.preventDefault();
      Router.go('/genre/' + Genres[i].name, Genres[i].title);
    });
  }

  showFilmsList('/selection', 'rec-root', 'Рекомендуем к просмотру');
  showFilmsList('/selection/newest', 'pop-root', 'Популярное на Lime TV');
  showFilmsList('/selection/hottest', 'new-root', 'Новое на Lime TV');
};


export const showFilmsList = (relUrl, rootId, title) => {
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
        if (rootId === 'selection-profile-3' || rootId === 'selection-profile-4') {
          root.innerHTML = filmProfile({
            title: title,
            films: result,
            salt: rootId,
          });
        } else {
          root.innerHTML = listPug({
            title: title,
            films: result,
            salt: rootId,
          });
        }

        if (rootId === 'new-root') {
          const tRoot = document.getElementById('first-root');
          tRoot.innerHTML = firstFilmPug({
            films: result[0],
          });
          const playBtn = document.querySelector('.play-text');
          playBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/player/' + result[0].src[0], result[0].title);
          });
          const firstFilm = document.getElementById('first_info');
          firstFilm.addEventListener('click', function(ev) {
            ev.preventDefault();
            Router.go('/film/' + result[0].id, result[0].title);
          });
        }
        for (let i = 0; i < result.length; i++) {
          const film = document.getElementById(result[i].id+rootId);
          film.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/film/' + result[i].id.toString(), result[i].title);
          });
        }
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  });
};
