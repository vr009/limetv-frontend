import {serverLocate} from '../utils/locale.js';
import {fetchRequest} from '../components/network/fetch.js';
import {showErrors} from '../components/utils/errors.js';

export const createActorPage = (state) => {
  document.title = 'Actor page';
  const url = serverLocate+':8000/actors/actor/'+state.id;

  fetchRequest(url, 'GET', null).then(
      (res) => {
        return res.ok ? res : Promise.reject(res);
      },
  ).then(
      (response) => {
        return response.json();
      },
  ).then(
      (result) => {
        if (result.status === 200) {
          console.log(result.body);
        } else {
          showErrors('Ошибка обработки запроса');
        }
      },
  ).catch(function(error) {
    showErrors('Ошибка отправки запроса');
  });
};
