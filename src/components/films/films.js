export const createFilms = () => {
  createToggle();
  createBasic();
};

const createToggle = () => {
  const stuff = document.getElementById('stuff');
  stuff.innerHTML = '';
  const div = document.createElement('div');
  div.setAttribute('class', 'toggle-container');
  stuff.appendChild(div);
  const input = document.createElement('input');
  input.dataset.section = 'hottest';
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'radio');
  input.setAttribute('value', 'radio');
  input.setAttribute('id', 'hottest');
  div.appendChild(input);
  const inputlabel = document.createElement('label');

  inputlabel.setAttribute('for', 'hottest');
  inputlabel.innerText = 'Hottest';
  div.appendChild(inputlabel);


  const input2 = document.createElement('input');
  input2.setAttribute('type', 'radio');
  input2.setAttribute('name', 'radio');
  input2.setAttribute('value', 'radio2');
  input2.setAttribute('id', 'newest');
  input2.dataset.section = 'newest';
  div.appendChild(input2);
  const inputlabel2 = document.createElement('label');

  inputlabel2.setAttribute('for', 'newest');
  inputlabel2.innerText = 'Newest';
  div.appendChild(inputlabel2);

  div.addEventListener('click', function(event) {
    const {target} = event;
    if (target instanceof HTMLInputElement) {
      event.preventDefault();
      if (div.classList.contains('newest')) {
        div.classList.add('hottest');
        div.classList.remove('newest');
        showFilms('hottest');
      } else {
        div.classList.add('newest');
        div.classList.remove('hottest');
        showFilms('newest');
      }
    }
  });
};

const createBasic = () => {
  const stuff = document.getElementById('stuff');
  const div = document.createElement('div');
  div.setAttribute('id', 'films-container');
  stuff.appendChild(div);
};


const showFilms = (state) => {
  const url = 'http://127.0.0.1:8000/films/selection/'+state;
  fetch(url, {
    method: 'GET',
  },
  ).then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.getElementById('films-container');
        root.innerHTML = '';
        for (let i = 0; i < result.length; i++) {
          const film = document.createElement('div');
          film.setAttribute('class', 'film-item');
          film.setAttribute('id', result[i].id);
          root.appendChild(film);
        }
      },
  ).catch((error) => {
    showErrors('');
  },
  );
};
