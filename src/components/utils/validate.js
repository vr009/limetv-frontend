
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
