export const validators = {
  email: (email) => validateEmail(email),
  username: (username) => validateUsername(username),
  password: (password) => validatePassword(password),
};

const validateEmail = (email) => {
  return email.length !== 0;
};

const validateUsername = (username) => {
  return username.length !== 0;
};

const validatePassword = (password) => {
  return password.length !== 0;
};
