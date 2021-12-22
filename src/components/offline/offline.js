import Router from '../../utils/router.js';
import '../pages/offline/offline.scss';
import offlinePagePug from '../pages/offline/offline.pug';
import {createMenu} from '../menu/menu.js';

export const offline = (path, title, state, needPush) => {
  const root = document.getElementById('root');
  root.innerHTML = offlinePagePug();

  const offlinePageMsg = document.getElementById('offline-title__text');

  const reloadBtn = document.getElementById('reload_page');
  reloadBtn.addEventListener('click', () => {
    if (navigator.onLine) {
      createMenu(false);
      Router.go(path, title, state, needPush);
    } else {
      offlinePageMsg.innerText = 'Соединение пока потеряно :(';
    }
  });
};
