import {createFilms} from '../components/films/films';
import {authModule, renderAuth} from '../components/auth/auth';
import {createMenu} from '../components/menu/menu';
import {offline} from '../components/offline/offline.js';
import {createActor} from '../components/actors/actor';
import {validate as uuidValidate} from 'uuid';
import {createFilmPage} from '../components/film/film_page';
import {createProfilePage} from '../view/createProfilePage';
import {logOut} from '../components/auth/auth';
import {createPlayerPage} from '../components/player/player';

export class Router {
  constructor() {
    this.routs = {
      '/': createFilms,
      '/signup': renderAuth,
      '/login': authModule.renderAuth,
      '/films': createFilms,
      '/profile': createProfilePage,
      // "/film": CreateChatView,
      '/player': createPlayerPage,
      '/logout': logOut,

      // пути ниже буду проверяться в методе go(), если не будет совпадения с путями, обозначенными выше
      // проверяются в (func === undefined)
    };

    window.addEventListener('popstate', (evt) => {
      // eslint-disable-next-line max-len
      // Если зашли первый раз только на страницу и браузер сохранил уже ее себе в стек
      if (evt.state === null) {
        this.go('/', null, evt.state, false);
      } else {
        const path = evt.state.path;
        this.go(path, evt.state.title, evt.state, false);
      }
    });
  }

  go(path, title, state=null, needPush=true, authedChanged=false) {
    if (!navigator.onLine) {
      offline(path, title, state=null, needPush);
      return;
    }

    if (authedChanged) {
      createMenu();
    }


    if (needPush === true) {
      console.log('GO path:' + path);
      if (state == null) {
        state = {};
      }
      state.path = path;
      state.title = title;
      window.history.pushState(
          state, // объект состояния
          state.title, // заголовок состояния
          path, // URL новой записи (same origin)
      );
    }
    // alert("Go : path:" + path);

    document.title = title;

    if (authedChanged) {
      createMenu();
    }


    const func = this.routs[path];

    if (func === undefined) {
      // this.go('/', 'Main', null, true, true); // плеер
      if (path.includes('/actor/')) {
        const uuid = path.substring('/actor/'.length, path.length);
        if (!uuidValidate(uuid)) {
          console.log('error UUID from url actor');
          window.history.back();
        }
        createActor(uuid);
      } else if (path.includes('/film/')) {
        const uuid = path.substring('/film/'.length, path.length);
        if (!uuidValidate(uuid)) {
          console.log('error UUID from url films');
          window.history.back();
        }
        createFilmPage(uuid);
      } else {
        this.go('/', 'Main', null, true, true);
      }
    } else {
      console.log('ROUTE FUNC:', func);
      console.log('ROUTE state:', state);
      func();
    }
  }

  start() {

    // получает пользователя в синглтон currenUser и вызывает go(текущий путь)
    // if (Requests.getUserProfile(false)) {
    //
    //
    //
    //   (true);
    // } else {
    //     createMenu(false);
    // }
  }
} export default new Router();
