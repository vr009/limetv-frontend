/** Singleton пользователя */
class CurrentUser {
  /** конструктор класса, создает пустого пользователя */
  constructor() {
    if (!CurrentUser._instance) {
      CurrentUser._instance = this;
      this.Data = {
        id: '',
        login: '',
        about: '',
        avatar: '',
        subscriptions: 0,
        subscribers: 0,
      };
    }
    return CurrentUser._instance;
  }

  /**
   * сеттер параметров текущего пользователя
   * @param  {[Object]} user [модель пользователя]
   */
  setUser(user) {
    this.Data = {
      id: user.id,
      login: user.login,
      about: user.about,
      avatar: user.avatar,
      subscriptions: user.subscriptions,
      subscribers: user.subscribers,
    };
    console.log(this.Data);
  }
}
