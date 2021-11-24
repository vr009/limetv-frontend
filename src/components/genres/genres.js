import {createMenu} from '../menu/menu';
import Router from '../../utils/router.js';
import {serverLocate} from '../../utils/locale.js';
import genresPage from '../pages/genres/genres.pug';

export const createGenres = (genres) => {
  createMenu();
  if (document.getElementById('stuff') === null) {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const stuff = document.createElement('div');
    stuff.setAttribute('id', 'stuff');
    root.appendChild(stuff);
  }
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';

  // запрос жанров

  // отрисовываю паг
  stuff.innerHTML = genresPage({
    genres: genres,
  });
};

