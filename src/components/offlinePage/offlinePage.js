import Router from '../../utils/router.js';
import '../pages/offline/offline.css';
import offlinePagePug from '../pages/offline/offline.pug';
import {createMenu} from '../menu/menu.js';

export function offlinePage(path, title, state, needPush) {
  const root = document.getElementById('root');
  root.innerHTML = offlinePagePug();

  const offlinePageMsg = document.getElementById('offline_page');

  const reloadBtn = document.getElementById('reload_page');
  reloadBtn.addEventListener('click', (evt)=>{
    if (navigator.onLine) {
      createMenu();
      Router.go(path, title, state, needPush);
    } else {
      offlinePageMsg.innerText = 'Соединение пока потеряно :(';
    }
  });
}
