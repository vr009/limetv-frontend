const regExpressions = {
  username: /^[a-zA-Z0-9_]{3,}$/,
  // ASCII chars from ! to ~
  password: /[!-~]{6,}/,
  userLink: /^\/user\/[\w-.]{1,}$/,
  loginLink: /^\/auth\/login\//,
  signupLink: /^\/auth\/signup\//,
  filmLink: /^\/film\/[\w-.]{1,}$/,
  actorLink: /^\/actor\/[\w-.]{1,}$/,
  playerLink: /^\/player\/[\w-.]{1,}$/,
};

export const validators = {
  username: (username) => validateField(username, regExpressions.username),
  password: (password) => validateField(password, regExpressions.password),
  userLink: (userLink) => validateField(userLink, regExpressions.userLink),
  loginLink: (loginLink) => validateField(loginLink, regExpressions.loginLink),
  signupLink: (signupLink) => validateField(signupLink, regExpressions.signupLink),
  filmLink: (filmLink) => validateField(filmLink, regExpressions.filmLink),
  actorLink: (actorLink) => validateField(actorLink, regExpressions.actorLink),
  playerLink: (playerLink) => validateField(playerLink, regExpressions.playerLink),
};

const validateField = (field, regExp) => {
  return regExp.test(String(field));
};

/**
 * validateCreateBoard
 * проверка вводимых данных
 * @param {string} name - имя пина
 * @param {string} description - описание пина
 * @return {boolean} isOk?
 */
export function validateCreateBoard(name, description) {

  if (name.length < 5 || name.length > 65 )
    return false;

  // @todo do we need description check?
  // it can be 0 length
  return true;
}

/**
 * validateAddPinComment
 * проверка вводимых данных
 * @param {string} comment - комментарий
 * @return {boolean} isOk?
 */
export function validateAddPinComment(comment) {
  return !(comment.length < 3 || comment.length > 64);
}
