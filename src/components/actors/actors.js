// import {showErrors} from '../utils/errors';

// import {fetchRequest} from '../network/fetch';
// import {showErrors} from '../utils/errors';
// import {createElements} from '../menu/elements';
// import {createFilms} from '../films/films';

/**
 * Модуль создания экрана фильмов
 * @function
 */
export const createActors = () => {
  createTemple();
  // createBasic();
};

const createTemple = () => {
  const pug = require('pug');
  const compiledFunction = pug.compileFile('actors.pug');
  console.log(compiledFunction({
    name: 'Timothy',
  }));
  // const url = 'http://127.0.0.1:8000/actors/actor/768eb570-2e0e-11ec-8d3d-0242ac130003';
  //
  // fetchRequest(url, 'GET').then(
  //     (response) => {
  //       if (response.ok) {
  //         response.json();
  //       } else {
  //         throw error;
  //       }
  //     },
  // ).then(
  //     (result) => {
  //       document.cookie = `jwt_token = ${result.token}`;
  //       createElements();
  //       createFilms();
  //     },
  // ).catch(function() {
  //   showErrors('Что-то пошло не так, попробуйте позже');
  // },
  // );
};

// const createBasic = () => {
//     const stuff = document.getElementById('stuff');
//     const div = document.createElement('div');
//     div.setAttribute('id', 'films-container');
//     stuff.appendChild(div);
// };


// const showFilms = (state) => {
//     const url = 'http://127.0.0.1:8000/films/selection/'+state;
//     fetch(url, {
//             method: 'GET',
//         },
//     ).then(
//         (response) => response.json(),
//     ).then(
//         (result) => {
//             const root = document.getElementById('films-container');
//             root.innerHTML = '';
//             for (let i = 0; i < result.length; i++) {
//                 const film = document.createElement('div');
//                 film.setAttribute('class', 'film-item');
//                 film.setAttribute('id', result[i].id);
//                 const div = document.createElement('div');
//                 div.setAttribute('class', 'dot');
//                 // div.innerText = result[i].title.slice(0,1);
//                 film.appendChild(div);
//                 const title = document.createElement('div');
//                 title.setAttribute('class', 'centered');
//                 title.innerText = result[i].title;
//                 film.appendChild(title);
//                 const desc = document.createElement('div');
//                 desc.setAttribute('class', 'centered');
//                 desc.innerText = result[i].genres.join();
//                 film.appendChild(desc);
//                 root.appendChild(film);
//             }
//         },
//     ).catch((error) => {
//             showErrors('');
//         },
//     );
// };
