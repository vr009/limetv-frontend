import profilePug from './profile.pug';
import {Router} from '../../utils/router.js';
import {fetchRequest} from "../network/fetch.js";
import {createProfile} from '../profile/profile.js';
import {serverLocate} from '../../utils/locale.js';
import {showErrors} from '../utils/errors.js';

export const createProfileSettingsPage = () => {
    const url = serverLocate+'/users/profile';

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
            const root = document.getElementById('stuff');
            root.innerHTML = profilePug({
                login: result.login,
                about: result.about,
            });
            createProfile(result);
        },
    ).catch(function(error) {
        showErrors('Ошибка отправки запроса');
    });
};
