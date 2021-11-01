'use strict';
import {createMenu} from './components/menu/menu.js';
import {createFilms} from './components/films/films.js';
import Router from './utils/router';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
          console.log('sWorker register!');
        })
        .catch((err) => {
          console.log('sWorker err:', err);
        });
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
