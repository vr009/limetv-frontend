'use strict';
import {createMenu} from './components/menu/menu.js';
import {createFilms} from './components/films/films.js';

const root = document.getElementById('root');
const menu = document.createElement('div');
menu.setAttribute('id', 'menu');
root.innerHTML = '';
root.appendChild(menu);
createMenu();
createFilms();
