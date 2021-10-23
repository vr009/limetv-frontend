/** Класс видеоплеера */
export class Player {
  /** Инициализация пустого объекта */
  constructor() {
    // сам компонент с видео
    this.videoBlock = document.querySelector('.player_block');
    this.video = this.videoBlock.querySelector('video');
    // компонент с названием
    this.title = document.querySelector('title');
    // компонент с громкостью
    this.volume = 100;
    this.statusPlaying = false;
    // список эпизодов
    this.episodes = [];
    if (!this.videoBlock || !this.video) {
      throw new Error('');
    }
    // листенер для блока с видео
    this.addVideoBlockListeners();
    // листенер для видео
    this.addVideoListeners();
  }

  /** Добавление всех листенеров для видеоблока*/
  addVideoBlockListeners() {
    // проигрывание по клику на кнопку
    this.videoBlock.querySelector('.start_stop_btn').
        addEventListener('click', this.toggleVideoPlaying.bind(this));
    // отматывание влево или вправо
    this.videoBlock.querySelector('.move_left_btn').
        addEventListener('click', this.changeTimelineLeft.bind(this));
    this.videoBlock.querySelector('.move_right_btn').
        addEventListener('click', this.changeTimelineRight.bind(this));
    // изменение громкости
    this.videoBlock.querySelector('.volume_btn').
        addEventListener('click', this.changeVolumeButton.bind(this));
    this.videoBlock.querySelector('.prev_button').
        addEventListener('click', this.previousEpisode.bind(this));
    this.videoBlock.querySelector('.next_button').
        addEventListener('click', this.nextEpisode.bind(this));
    // обновление линии времени
    this.video.addEventListener('mousemove',
        this.changeVideoDuration.bind(this));

    this.changeTimelineGeneral();
  }

  /** Добавление всех листенеров для видео*/
  addVideoListeners() {
    // статус проигрывания по клику
    this.video.addEventListener('click', this.toggleVideoPlaying.bind(this));
    // обновление метадаты при загрузке
    this.video.addEventListener('loadedmetadata', this.setMetadata.bind(this));
    // обновление проигрывания при клике
    this.video.addEventListener('timeupdate',
        this.changeTimelineButton.bind(this));
    // обновление звука при клике
    this.video.addEventListener('volumechange', this.changeVolumeButton.bind(this));
  }

  /**  Изменение состояния видео */
  toggleVideoPlaying() {
    // меняем состояние
    this.statusPlaying = !this.statusPlaying;
    // меняем иконки
    this.changePlayButton();
    // меняем состояние видео
    this.video[this.statusPlaying ? 'play' : 'pause']();
  }

  /** Изменение кнопки */
  changePlayButton() {
    // изменение иконок
    if (this.statusPlaying) {
      this.videoBlock.querySelector('.start_stop_btn').innerHTML = '⏵';
    } else {
      this.videoBlock.querySelector('.start_stop_btn').innerHTML = '⏸';
    }
  }

  /** Обновление метадаты */
  setMetadata() {
    this.changeVideoDuration();
  }

  /** Обновление громкости */
  changeVolumeButton() {
    console.log('???');
  }

  /** Обновление таймлайна по клику */
  changeTimelineButton() {

  }

  /** Обновление данных о времени */
  changeVideoDuration() {
    const time = Number(this.video.duration.toFixed());
    const currentTime = Number(this.video.currentTime.toFixed());

    console.log(time, currentTime);
    let formatted = '0:00 / 0:00';
    if (!isNaN(time) && !isNaN(currentTime)) {
      formatted = `${this.timeHelper(currentTime)} / ${this.timeHelper(time)}`;
    }
    const holder = this.videoBlock.querySelector('.duration_holder');
    holder.innerHTML = formatted;
  }

  /** Красивое форматирование времени
   ** @param {Object} time - время для форматирования
   *  @return {String} formatted - строка для холдера
   */
  timeHelper(time) {
    return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;
  }

  /** Отматывание времени влево */
  changeTimelineLeft() {
    this.video.currentTime = this.video.currentTime - 15 < 0 ? 0 :
        this.video.currentTime - 15;
  }

  /** Отматывание времени вправо */
  changeTimelineRight() {
    this.video.currentTime = this.video.currentTime + 15 < this.video.duration ?
            this.video.currentTime + 15 : this.video.duration;
  }

  /** Листенеры на нажатие кнопок */
  changeTimelineGeneral() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.changeTimelineLeft();
          break;
        case 'ArrowRight':
          this.changeTimelineRight();
          break;
        case 'Space':
          this.toggleVideoPlaying();
          break;
      }
    });
  }

  /** TODO: переключение эпизода */
  previousEpisode() {
    console.log('prev');
  }

  /** TODO: переключение эпизода */
  nextEpisode() {
    console.log('next');
  }

  /** TODO: переключение эпизода
   ** @param {String} src - src следующей серии
   */
  resetPlayer(src) {
    this.video.src = `${src}`;
    this.video.currentTime = 0;
  }
}
