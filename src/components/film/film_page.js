import {showErrors} from '../utils/errors.js';
import './film_page.css';
import '../../components/pages/menu/menu.css';
import {Player} from '../player/player';
import Router from '../../utils/router';
import PlayerPug from '../pages/player/player.pug';
/**
 * Модуль создания страницы фильма
 * @function
 */
export const createFilmPage = (id) => {
    createBase(id);
};

const createBase = (id) => {
    const stuff = document.getElementById('stuff');
    stuff.innerHTML = '';
    showFilm(id);
};


const showFilm = (filmId) => {
    const url = 'http://127.0.0.1:8000/films/film/'+filmId;
    fetch(url, {
            method: 'GET',
        },
    ).then(
        (response) => response.json(),
    ).then(
        (result) => {
            filmPageRender(result);
        },
    ).catch((error) => {
            console.log(error);
            showErrors(error);
        },
    );
};


const FetchActors = (actors, rootTag) => {
    const url = 'http://127.0.0.1:8000/actors/film';
    const actorsBody = [];
    for (let i = 0; i < actors.length; i++) {
        let bdy = {
            id: actors[i].toString(),
        }
        actorsBody.push(bdy);
    }

    console.log(JSON.stringify(actorsBody));

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(actorsBody),
        },
    ).then(
        (response) => response.json(),
    ).then(
        (result) => {
            console.log('here');
            console.log(result);
            actorsLineRender(result, rootTag);
        },
    ).catch((error) => {
            console.log(error);
            showErrors(error);
        },
    );
}

const filmPageRender = (result) => {
    const stuff = document.getElementById('stuff');

    const root = document.createElement('div');
    root.setAttribute('class', 'film-page-container');

    const filmItemContainer = document.createElement('div');
    filmItemContainer.setAttribute('class', 'film-item-container');
    filmItemContainer.setAttribute('id', 'film-item-container');
    const film = document.createElement('img');
    film.setAttribute('src', '../../../tmp/'+result.src[0]);
    film.setAttribute('class', 'film-pic');
    filmItemContainer.appendChild(film);
    root.appendChild(filmItemContainer);

    const description = document.createElement('div');
    description.setAttribute('class', 'film_description');

    const title = document.createElement('h1');
    title.setAttribute('class', 'film-note');
    title.innerText = result.title;
    description.appendChild(title);

    const watchBtn = document.createElement('a');
    watchBtn.setAttribute('type', 'button');
    watchBtn.setAttribute('class', 'watch-btn');
    watchBtn.innerText = 'Смотреть';
    watchBtn.href = ``;
    watchBtn.addEventListener('click', function(event) {
        const {target} = event;
        event.preventDefault();
        stuff.innerHTML = PlayerPug();
        new Player();
    });
    description.appendChild(watchBtn);

    const year = document.createElement('div');
    year.setAttribute('class', 'film-note');
    year.innerText = 'Год: ' + result.year;
    description.appendChild(year);

    const language = document.createElement('div');
    language.setAttribute('class', 'film-note');
    language.innerText = 'Язык: ' + result.language;
    description.appendChild(language);

    const duration = document.createElement('div');
    duration.setAttribute('class', 'film-note');
    duration.innerText = 'Продолжительность: ' + result.duration;
    description.appendChild(duration);

    const release = document.createElement('div');
    release.setAttribute('class', 'film-note');
    release.innerText = 'Дата релиза: ' + result.release;
    description.appendChild(release);

    const directors = document.createElement('div');
    directors.setAttribute('class', 'film-note');
    directors.innerText = 'Исполнительный директор: ' + result.director;
    description.appendChild(directors);

    const authors = document.createElement('div');
    authors.setAttribute('class', 'film-note');
    authors.innerText = 'Авторы сценария: ' + result.authors;
    description.appendChild(authors);

    const genres = document.createElement('div');
    genres.setAttribute('class', 'film-note');
    genres.innerText = 'Жанр: ' + result.genres;
    description.appendChild(genres);

    const actors = document.createElement('div');
    actors.setAttribute('id', 'actors');
    actors.setAttribute('class', 'actors');
    genres.setAttribute('class', 'film-note');
    console.log(result.actors);
    FetchActors(result.actors, 'actors');
    description.appendChild(actors);



    root.appendChild(description);
    stuff.appendChild(root);
}

const actorsLineRender = (result, rootTag) => {
    const root = document.getElementById(rootTag);

    const actorsContainer = document.createElement('div');
    actorsContainer.setAttribute('class', 'actors-container')
    console.log(result.length);
    for (let i = 0; i < result.length; i++) {
        const actorContainer = document.createElement('div');
        actorContainer.setAttribute('class', 'actor-container');

        const actorPhoto = document.createElement('img');
        actorPhoto.setAttribute('src', result[i].avatar);
        actorPhoto.setAttribute('class', 'actor-photo');

        const ActorName = document.createElement('div');
        ActorName.setAttribute('class', 'film-note');
        ActorName.innerText = result[i].name + ' ' + result[i].surname;

        actorContainer.appendChild(actorPhoto);
        actorContainer.appendChild(ActorName);
        actorsContainer.appendChild(actorContainer);
    }
    root.appendChild(actorsContainer);
}
