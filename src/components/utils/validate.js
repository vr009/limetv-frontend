export const validators = {
  email: (email) => validateEmail(email),
  username: (username) => validateUsername(username),
  password: (password) => validatePassword(password),
};

const MIN_PATH_LENGTH = 6;
const MAX_PATH_LENGTH = 15;
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
