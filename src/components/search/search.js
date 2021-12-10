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
          isResult: true,
        });
        const res = ['actors', 'films'];
        for (let j = 0; j <= 1; j++) {
          if (result[res[j]].length !== 0) {
            for (let i = 0; i < result[res[j]].length; i++) {
              const film = document.getElementById(result[res[j]][i].id + 'close_focus');
              film.addEventListener('click', function(event) {
                event.preventDefault();
                if (j === 0) {
                  Router.go('/actor/' + result[res[j]][i].id.toString(), result[res[j]][i].name+' '+result[res[j]][i].surname);
                } else {
                  Router.go('/film/' + result[res[j]][i].id.toString(), result[res[j]][i].title);
                }
                const searchForm = document.getElementById('text_search');
                searchForm.value = '';
                const searchBtn = document.querySelector('.search-icon');
                const cancelBtn = document.querySelector('.cancel-icon');
                const form = document.querySelector('form');
                searchBtn.classList.remove('hide');
                cancelBtn.classList.remove('show');
                form.classList.remove('active');
              });
            }
          }
        }
        const closeSearch = document.getElementById('cl-search');
        closeSearch.addEventListener('click', function(event) {
          event.preventDefault();
          const search = document.getElementById('close_focus');
          search.parentNode.removeChild(search);
          const searchForm = document.getElementById('text_search');
          searchForm.value = '';
        });
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  },
  );
};
