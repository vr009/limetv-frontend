import {showErrors} from '../utils/errors';
import actorPagePug from '../pages/actors/actor.pug';
import filmPagePug from '../pages/actors/oneFilm.pug';
import '../pages/actors/actor.css';


export const createActor = (state) => {
  const filmGlobal = document.getElementById('films-container');
  if (filmGlobal != null) {
    filmGlobal.innerHTML = '';
  }
  const rootGlobal = document.getElementById('stuff');

  const actor = document.createElement('div');
  actor.setAttribute('id', 'one_actor');
  rootGlobal.appendChild(actor);

  const film = document.createElement('div');
  film.setAttribute('id', 'one_film');

  rootGlobal.appendChild(film);

  // const state = '3e06d4e4-3b47-11ec-8d3d-0242ac130003'; // временно
  showActor(state);
  getFilmsByActor(state);
};

const showActor = (state) => {
  const url = 'http://127.0.0.1:8000/actors/actor/'+state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const actorRoot = document.getElementById('one_actor');

        const upName = result.name[0].toUpperCase()+result.name.slice(1);
        const upSurname = result.surname[0].toUpperCase()+result.surname.slice(1);

        const birth = getBirth(new Date(result.date_of_birth));

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
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};

function getFilmsByActor(state) {
  const url = 'http://127.0.0.1:8000/films/selection/actor/' + state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const rootFilm = document.getElementById('one_film');
        for (let i=0; i < result.length; i++) {
          result[i].title = result[i].title+' ('+result[i].year+')';
          result[i].duration = result[i].duration+'+';
          result[i].director = result[i].director[0];
        }
        rootFilm.innerHTML = filmPagePug({
          films: result,
        });
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
}

function getBirth(birth) {
  let birthDay = birth.getDay();
  switch (birth.getMonth()) {
    case 0:
      birthDay += ' января ';
      break;
    case 1:
      birthDay += ' февраля ';
      break;
    case 2:
      birthDay += ' марта ';
      break;
    case 3:
      birthDay += ' апреля ';
      break;
    case 4:
      birthDay += ' мая ';
      break;
    case 5:
      birthDay += ' июня ';
      break;
    case 6:
      birthDay += ' июля ';
      break;
    case 7:
      birthDay += ' августа ';
      break;
    case 8:
      birthDay += ' сентября ';
      break;
    case 9:
      birthDay += ' октября ';
      break;
    case 10:
      birthDay += ' ноября ';
      break;
    case 11:
      birthDay += ' декабря ';
      break;
  }
  birthDay += birth.getFullYear();
  return birthDay;
}
