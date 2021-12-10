import {showErrors} from '../utils/errors.js';
import {serverLocate} from '../../utils/locale.js';
import actorPagePug from '../pages/actors/actor.pug';
import actorFilmsPug from '../pages/actors/actorFilms.pug';
import '../pages/actors/actor.scss';
import Router from '../../utils/router.js';
import {getMonth} from '../utils/validate.js';


export const createActor = (state) => {
  const rootGlobal = document.getElementById('stuff');
  if (rootGlobal != null) {
    rootGlobal.innerHTML = '';
  }
  rootGlobal.setAttribute('class', 'stuff');

  const actor = document.createElement('div');
  actor.setAttribute('id', 'one_actor');
  rootGlobal.appendChild(actor);

  showActor(state);
};

const showActor = (state) => {
  const url = serverLocate+'/actors/actor/'+state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const actorRoot = document.getElementById('one_actor');

        const upName = result.name[0].toUpperCase()+result.name.slice(1);
        const upSurname = result.surname[0]
            .toUpperCase()+result.surname.slice(1);

        const birth = getMonth(new Date(result.date_of_birth));

        actorRoot.innerHTML = actorPagePug({
          avatar: '/' + result.avatar,
          name: upName,
          surname: upSurname,
          date_of_birth: birth,
          description: result.description,
          genres: result.genres,
          height: result.height,
          id: result.id,
        });

        for (let i = 0; i < result.genres.length; i++) {
          const film = document.getElementById(result.genres[i]);
          film.addEventListener('click', function(event) {
            event.preventDefault();
            Router.go('/genre/' + result.genres[i], result.genres[i]);
          });
        }

        getFilmsByActor(state);
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};

const getFilmsByActor = (state) => {
  const url = serverLocate+'/films/selection/actor/' + state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const rootFilm = document.getElementById('selection-profile-5');
        for (let i = 0; i < result.length; i++) {
          result[i].title = result[i].title+' ('+result[i].year+')';
          result[i].director = result[i].director[0];
          result[i].duration = result[i].duration+'м';
        }
        rootFilm.innerHTML = actorFilmsPug({
          films: result,
        });

        for (let i = 0; i < result.length; i++) {
          const t = document.getElementById(result[i].id);
          t.addEventListener('click', function(event) {
            event.preventDefault();
            const rootPage = document.getElementById('stuff');
            rootPage.innerHTML = '';
            const film = {
              name: result[i].title,
              slug: result[i].slug,
            };
            Router.go('/film/' + result[i].id.toString(), film);
          });
        }
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};
