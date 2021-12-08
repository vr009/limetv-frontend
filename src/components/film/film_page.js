import '../pages/film/film_page.scss';
import '../pages/menu/menu.scss';
import {showErrors} from '../utils/errors.js';
import filmPagePug from '../pages/film/film_page.pug';
import actorsLinePug from '../pages/film/actorsLine.pug';
import {serverLocate} from '../../utils/locale.js';
import Router from '../../utils/router.js';
import {getMonth, getTimeFromMins, sklonenieSeries} from '../utils/validate.js';
import {fetchRequest} from '../network/fetch.js';
import {createMenu} from '../menu/menu';

/**
 * Модуль создания страницы фильма
 * @function
 */
export const createFilmPage = (id) => {
  createBase(id);
};

const createBase = (id) => {
  if (document.getElementById('navbar') === null) {
    createMenu();
  }
  if (document.getElementById('stuff') === null) {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const stuff = document.createElement('div');
    stuff.setAttribute('id', 'stuff');
    stuff.setAttribute('class', 'stuff');
    root.appendChild(stuff);
  }
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';
  stuff.setAttribute('class', 'stuff');

  const rootFilm = document.createElement('div');
  rootFilm.setAttribute('id', 'root-film');
  stuff.appendChild(rootFilm);

  showFilm(id);
};


const showFilm = (filmId) => {
  const url = serverLocate+'/films/film/'+filmId;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const rootFilm = document.getElementById('root-film');
        result.duration = getTimeFromMins(result.duration);
        result.release = getMonth(new Date(result.release));
        result.release_rus = getMonth(new Date(result.release_rus));
        const countSeries = (result.is_series) ? result.seasons.length+' '+sklonenieSeries(result.seasons.length, ['сезон', 'сезона', 'сезонов']) : '';
        rootFilm.innerHTML = filmPagePug({
          result: result,
          seasons: result.seasons,
          countSeries: countSeries,
        });
        const watchBtn = document.querySelector('.btn-watch');
        watchBtn.addEventListener('click', function(event) {
          event.preventDefault();
          Router.go('/player/'+result.src[0], result.title);
        });

        // временно уникальное название видео и картинок
        if (result.is_series) {
          for (let i = 0; i < result.seasons.length; i++) {
            for (let j = 0; j < result.seasons[i].Pics.length; j++) {
              const actorContainer = document.getElementById(result.seasons[i].Src[j]);
              actorContainer.addEventListener('click', function(event) {
                event.preventDefault();
                Router.go('/player/'+result.seasons[i].Pics[j], result.title);
              });
            }
          }
        }

        for (let i = 0; i < result.genres.length; i++) {
          const film = document.getElementById(result.genres[i]);
          film.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/genre/' + result.genres[i], result.genres[i]);
          });
        }

        const url = serverLocate+'/films/starred/check/'+ filmId;
        fetchRequest(url, 'GET', null).then(
            (res) => {
              if (res.ok) {
                const likeBtn = document.getElementById('re-like');
                likeBtn.classList.toggle('re-btn-unwatch');
              }
            }).catch((error) => {
          console.log(error);
          showErrors(error);
        },
        );

        // авторизован ли пользователь или нет,
        // отрисовываем по разному кнопки лайка и отложенного просмотра
        checkAuth(filmId);

        showActors(result.actors);
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};

const showActors = (actors) => {
  const url = serverLocate+'/actors/film';
  const actorsBody = [];
  for (let i = 0; i < actors.length; i++) {
    const bdy = {
      id: actors[i].toString(),
    };
    actorsBody.push(bdy);
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(actorsBody),
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        let salt = 'many-actors';
        const manyActors = document.getElementById('many-actors');
        manyActors.innerHTML = actorsLinePug({
          actors: result,
          salt: salt,
        });

        for (let i = 0; i < result.length; i++) {
          const actorContainer = document.getElementById(result[i].id+salt);
          actorContainer.addEventListener('click', function(event) {
            event.preventDefault();
            const rootPage = document.getElementById('stuff');
            rootPage.innerHTML = '';
            Router.go('/actor/'+result[i].id, result[i].name+' '+result[i].surname);
          });
        }

        salt = 'root-actors';
        const root = document.getElementById('root-actors');
        if (result.length > 3) {
          result = result.slice(0, 3);
        }
        root.innerHTML = actorsLinePug({
          actors: result,
          salt: salt,
        });
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};


const likeFilm = (filmId) => {
  const url = serverLocate + '/films/starred/' + filmId;
  fetchRequest(url);
};

const dislikeFilm = (filmId) => {
  const url = serverLocate + '/films/starred/' + filmId;
  fetchRequest(url, 'DELETE');
};

const watchLater = (filmId) => {
  const url = serverLocate + '/films/wl/' + filmId;
  fetchRequest(url);
};


const checkAuth = (filmId) => {
  const url = serverLocate+'/users/auth';
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  },
  ).then(
      (response) => {
        if (!response.ok) {
          throw error;
        }
      },
  ).then(
      (result) => {
        const likeBtn = document.getElementById('re-like');
        likeBtn.addEventListener('click', function(event) {
          event.preventDefault();
          const isStarred = likeBtn.classList.contains('re-btn-unwatch');
          if (isStarred) {
            dislikeFilm(filmId);
          } else {
            likeFilm(filmId);
          }
          likeBtn.classList.toggle('re-btn-unwatch');
        });

        const wlBtn = document.getElementById('wl');
        wlBtn.addEventListener('click', function(event) {
          event.preventDefault();
          watchLater(filmId);
          wlBtn.classList.toggle('btn-unwatch-later');
        });
      },
  ).catch((error) => {
    const likeBtn = document.getElementById('re-like');
    likeBtn.classList.add('info-b');
    const wlBtn = document.getElementById('wl');
    wlBtn.classList.add('info-b');
  },
  );
};
