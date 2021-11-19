
export const validators = {
  /**
   * Проверяет валидность адреса почты
   * @function
   * @param {string} email - Адрес почты
   * @return {boolean} - Флаг соответсвия адреса требованиям
   */
  email: (email= '') => validateEmail(email),
  /**
   * Проверяет валидность адреса почты
   * @function
   * @param {string} username - Имя пользователя (юзернейм)
   * @return {boolean} - Флаг соответсвия юзернейма требованиям
   */
  username: (username) => validateUsername(username),
  /**
   * Проверяет валидность пароля
   * @function
   * @param {string} password - Пользовательский пароль в открытом виде
   * @return {boolean} - Флаг соответсвия пароля требованиям
   */
  password: (password) => validatePassword(password),
};

const MIN_PATH_LENGTH = 6;
const MAX_PATH_LENGTH = 16;
const MIN_USERNAME_LENGTH = 4;
const emailCheck =
    /^[^\\s@]+@[^\\s@]+.[^\\s@]+$/;

const validateEmail = (email = '') => {
  return emailCheck.test(email);
};

const validateUsername = (username) => {
  return username.length >= MIN_USERNAME_LENGTH;
};

const validatePassword = (password) => {
  return password.length >= MIN_PATH_LENGTH &&
      password.length <= MAX_PATH_LENGTH;
};

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return hours + ' ч ' + minutes + ' мин';
};

export function getMonth(birth) {
  let birthDay = birth.getDay();
  switch (birth.getMonth()) {
    case 0:
      birthDay += ' января ';
      break;
    case 1:
      birthDay += ' февраля ';
      break;
    case 2:
      birthDay += ' марта ';
      break;
    case 3:
      birthDay += ' апреля ';
      break;
    case 4:
      birthDay += ' мая ';
      break;
    case 5:
      birthDay += ' июня ';
      break;
    case 6:
      birthDay += ' июля ';
      break;
    case 7:
      birthDay += ' августа ';
      break;
    case 8:
      birthDay += ' сентября ';
      break;
    case 9:
      birthDay += ' октября ';
      break;
    case 10:
      birthDay += ' ноября ';
      break;
    case 11:
      birthDay += ' декабря ';
      break;
  }
  birthDay += birth.getFullYear();
  return birthDay;
}