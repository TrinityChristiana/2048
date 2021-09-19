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

export const getGameData = () => {
  console.log('getting game Data');
};

export const updateGameData = (gameData, tileData) => {
  console.log('Updating Game Data');
  console.log('gameData', gameData);
  console.log('tileData', tileData);
};

export const watchStorage = (e) => {
  updateHighScore(e.oldValue);
};
