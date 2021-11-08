import {showErrors} from '../utils/errors.js';
import {createFilmPage} from '../film/film_page.js';
/**
 * Модуль создания экрана фильмов
 * @function
 */
export const createFilms = () => {
  createToggle();
  createBasic();
};

const createToggle = () => {
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';
  showSelection();
  showFilms('Популярное на LimeTV');
  showFilms('Новое на LimeTV');
};

const createBasic = () => {
  const stuff = document.getElementById('stuff');
  const div = document.createElement('div');
  div.setAttribute('id', 'films-container');
  div.setAttribute('class', 'films-container');
  stuff.appendChild(div);
};


const showFilms = (state) => {
  const url = 'http://127.0.0.1:8000/films/selection/'+state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.createElement('div');
        const rootGlobal = document.getElementById('films-container');
        const divLabel = document.createElement('div');
        const label = document.createElement('h1');
        label.innerText = state;
        label.setAttribute('class','selection-label');
        label.setAttribute('id','selection-label');
        divLabel.appendChild(label)
        root.appendChild(divLabel);

        for (let i = 0; i < result.length; i++) {
          const filmItemContainer = document.createElement('div');
          filmItemContainer.setAttribute('class', 'film-item-container');
          filmItemContainer.setAttribute('id', 'film-item-container');
          const film = document.createElement('img');
          film.setAttribute('film_id', result[i].id);
          film.setAttribute('src', '../../../tmp/' + result[i].src[0]);
          film.setAttribute('class', 'film-item');
          filmItemContainer.appendChild(film);

          film.addEventListener('click', function(event) {
              const {target} = event;
              event.preventDefault();
              createFilmPage(result[i].id);
          });

          root.appendChild(filmItemContainer);
        }
        rootGlobal.appendChild(root);
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};

const showSelection = () => {
  const url = 'http://127.0.0.1:8000/films/selection';
  fetch(url, {
        method: 'GET',
      },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.createElement('div');
        const rootGlobal = document.getElementById('films-container');
        const divLabel = document.createElement('div');
        const label = document.createElement('h1');
        label.innerText = 'Рекомендуем к просмотру';
        label.setAttribute('class','selection-label');
        label.setAttribute('id','selection-label');
        divLabel.appendChild(label);
        root.appendChild(divLabel);

        for (let i = 0; i < result.length; i++) {
            const filmItemContainer = document.createElement('div');
            filmItemContainer.setAttribute('class', 'film-item');
            filmItemContainer.setAttribute('id', 'film-item');
            const film = document.createElement('img');
            film.setAttribute('src', '../../../tmp/' + result[i].src[0]);
            film.setAttribute('film_id', result[i].id);
            film.setAttribute('class', 'film-item');
            filmItemContainer.appendChild(film);
            film.addEventListener('click', function(event) {
                const {target} = event;
                event.preventDefault();
                createFilmPage(result[i].id);
            });
            root.appendChild(filmItemContainer);
        }
        rootGlobal.appendChild(root);
      },
  ).catch((error) => {
        console.log(error);
        showErrors(error);
      },
  );
};
