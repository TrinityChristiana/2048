export const getHighScore = () => {
  const highscore = window.localStorage.getItem('highscore');
  if (highscore) {
    return Number(highscore);
  } else {
    window.localStorage.setItem('highscore', 0);
    return 0;
  }
};

export const updateHighScore = (score) => {
  window.localStorage.setItem('highscore', score);
};
