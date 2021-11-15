import {serverLocate} from "../../utils/locale.js";
import searchPagePug from '../pages/search/search.pug';
import {showErrors} from "../utils/errors.js";

export const createSearchPage = (keyword) => {
    const url = serverLocate+'/search/'+keyword;
    fetch(url, {
        method: 'GET',
        credentials: 'include',
        },
    ).then(
        (response) => response.json(),
    ).then(
        (result) => {
            const root = document.getElementById('');
            root.innerHTML = searchPagePug({result: result})
        }
        //добавить листенеры
    ).catch((error) => {
            console.log(error);
            showErrors(error);
        },
    );
}
