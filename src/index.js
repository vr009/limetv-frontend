'use strict';
import {createOfflinePage} from './components/offlinePage/offlinePage.js';
import {createMenu} from './components/menu/menu.js';
import {createFilms} from './components/films/films.js';
import Router from './utils/router.js';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
          console.log('sWorker register!');
        })
        .catch((err) => {
          console.log('sWorker err:', err);
        });
    if (!navigator.onLine) {
      console.log('offline load path:', window.location.pathname);
      offlinePage(window.location.pathname, document.title);
    }
  });
}

Router.start();
const root = document.getElementById('root');
const menu = document.createElement('div');
menu.setAttribute('id', 'menu');
root.innerHTML = '';
root.appendChild(menu);
createMenu();
createFilms();
