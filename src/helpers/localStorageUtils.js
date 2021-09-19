import { defaultGameData } from './gameUtils';

export const updateHighScore = (score) => {
  window.localStorage.setItem('highscore', score);
};

export const getGameData = () => {
  const gameData = window.localStorage.getItem('gameData');
  if (gameData) {
    return { ...JSON.parse(gameData) };
  } else {
    return { ...updateGameData(defaultGameData()) };
  }
};

export const updateGameData = (gameData) => {
  const stringifiedData = JSON.stringify(gameData);
  window.localStorage.setItem('gameData', stringifiedData);
  return gameData;
};
export const getTileData = () => {
  const tileData = window.localStorage.getItem('tileData');
  if (tileData) {
    return JSON.parse(tileData);
  } else {
    return updateTileData([]);
  }
};

export const updateTileData = (tileData) => {
  const stringifiedData = JSON.stringify(tileData);
  window.localStorage.setItem('tileData', stringifiedData);
  return tileData;
};

export const watchStorage = (e) => {
  if (e.key === 'gameData') {
    updateGameData(JSON.parse(e.oldValue));
  }
  if (e.key === 'tileData') {
    updateTileData(JSON.parse(e.oldValue));
  }
};
