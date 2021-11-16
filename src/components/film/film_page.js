import '../pages/film/film_page.css';
import '../../components/pages/menu/menu.css';
import {Player} from '../player/player';
import {showErrors} from '../utils/errors.js';
import filmPagePug from '../pages/film/film_page.pug';
import actorsLinePug from '../pages/film/actorsLine.pug';
import {serverLocate} from '../../utils/locale.js';
import Router from '../../utils/router';

/**
 * Модуль создания страницы фильма
 * @function
 */
export const createFilmPage = (id) => {
  createBase(id);
};

const createBase = (id) => {
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';

  const rootFilm = document.createElement('div');
  rootFilm.setAttribute('id', 'root-film');
  stuff.appendChild(rootFilm);

  const rootActors = document.createElement('div');
  rootActors.setAttribute('id', 'root-actors');
  stuff.appendChild(rootActors);

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
        rootFilm.innerHTML = filmPagePug({
          result: result,
        });
        const watchBtn = document.querySelector('.watch-btn');
        watchBtn.addEventListener('click', function(event) {
          event.preventDefault();
          Router.go('/player/'+result.src[0], 'Player');
        });
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

  console.log(JSON.stringify(actorsBody));

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(actorsBody),
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        console.log('here');
        console.log(result);
        const root = document.getElementById('root-actors');
        root.innerHTML = actorsLinePug({
          actors: result,
        });

        for (let i = 0; i < result.length; i++) {
          const actorContainer = document.getElementById(result[i].id);
          actorContainer.addEventListener('click', function(event) {
            event.preventDefault();
            const rootPage = document.getElementById('stuff');
            rootPage.innerHTML = '';
            Router.go('/actor/'+result[i].id, 'actor');
          });
        }
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};
