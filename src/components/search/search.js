import {serverLocate} from '../../utils/locale.js';
import searchPagePug from '../pages/search/search.pug';
import {showErrors} from '../utils/errors.js';
import Router from '../../utils/router';
import {fetchRequest} from '../network/fetch';

export const createSearchPage = (keyword) => {
  const url = serverLocate+'/search/'+keyword;
  fetchRequest(url, 'GET', null,
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.getElementById('close_focus');
        root.innerHTML = searchPagePug({
          result: result,
          salt: 'close_focus',
        });
        const res = ['actors', 'films'];
        for (let j = 0; j <= 1; j++) {
          if (result[res[j]].length !== 0) {
            for (let i = 0; i < result[res[j]].length; i++) {
              const film = document.getElementById(result[res[j]][i].id + 'close_focus');
              film.addEventListener('click', function(event) {
                event.preventDefault();
                if (j === 0) {
                  Router.go('/actor/' + result[res[j]][i].id.toString());
                } else {
                  Router.go('/film/' + result[res[j]][i].id.toString());
                }
              });
            }
          }
        }
      },
      // добавить листенеры
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};


const addListeners = (result) => {
  const root = document.getElementById('search_results');
  for (let i = 0; i < result.films.length; i++) {
    const element = document.getElementById(result.films[i].id);
    element.addEventListener('click', function(evt) {
      evt.preventDefault();
      Router.go('/film/' + result.films[i].id, 'film');
    });
  }


  for (let i = 0; i < result.actors.length; i++) {
    const element = document.getElementById(result.actors[i].id);
    element.addEventListener('click', function(evt) {
      evt.preventDefault();
      Router.go('/actor/'+result[i].id, 'actor');
    });
  }

  //TODO: profiles


};
