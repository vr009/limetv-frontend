'use strict';
// import {offline} from './components/offline/offline.js';
import {createMenu} from './components/menu/menu.js';
// import {createFilms} from './components/films/films.js';
import {Router} from './utils/router.js';
import Rout from './utils/router.js';

// потом раскоментить
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//         .then(() => {
//           console.log('sWorker register!');
//         })
//         .catch((err) => {
//           console.log('sWorker err:', err);
//         });
//     if (!navigator.onLine) {
//       console.log('offline load path:', window.location.pathname);
//       offline(window.location.pathname, document.title);
//     }
//   });
// }

new Router();
const root = document.getElementById('root');
const menu = document.createElement('div');
menu.setAttribute('id', 'menu');
root.innerHTML = '';
root.appendChild(menu);
createMenu();
Rout.go(window.location.pathname, document.title);
// createFilms();
