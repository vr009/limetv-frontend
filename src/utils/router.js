import {createFilms} from '../components/films/films.js';
import {authModule} from '../components/auth/auth.js';
import {createMenu} from '../components/menu/menu.js';
import {offline} from '../components/offline/offline.js';
import {createActor} from '../components/actors/actor.js';
import {validate as uuidValidate} from 'uuid';
import {createFilmPage} from '../components/film/film_page.js';
import {logOut} from '../components/auth/auth.js';
import {createPlayerPage} from '../components/player/player.js';
import {createGenres} from '../components/genres/genres.js';
import {createUserInfoPage} from '../components/profile_info/profile_info.js';
import {createProfileSettingsPage} from '../components/profile/profilePage.js';

export class Router {
  constructor() {
    this.routs = {
      '/': createFilms,
      '/signup': authModule.renderRegistration,
      '/login': authModule.renderAuth,
      '/settings': createProfileSettingsPage,
      '/profile': createUserInfoPage,
      '/player': createPlayerPage,
      '/logout': logOut,
    };

    window.addEventListener('popstate', (evt) => {
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

    document.title = title;

    const func = this.routs[path];

    if (func === undefined) {
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
      } else if (path.includes('/player/')) {
        const src = path.substring('/player/'.length, path.length);
        createPlayerPage(src);
      } else if (path.includes('/genre/')) {
        const genres = path.substring('/genre/'.length, path.length);
        createGenres(genres);
      } else {
        this.go('/', 'LimeTV', null, true, true);
      }
    } else {
      console.log('ROUTE FUNC:', func);
      console.log('ROUTE state:', state);
      func();
    }
  }
} export default new Router();
