'use strict';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
          console.log('sWorker register!');
        })
        .catch((err) => {
          console.log('sWorker err:', err);
        });
  });
}

// Тут будет роутер
