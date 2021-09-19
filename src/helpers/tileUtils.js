import { updateHighScore } from './localStorageUtils';
import { v4 } from 'uuid';

export const createNewTileData = ({ orientationData, orientationOrder, reverseOrientation, setGameData, positionKey }) => {
  const newTileData = [];
  orientationData.forEach((positionOption) => {
    const loopOrder = [...orientationOrder];
    if (positionOption.length) {
      const posotionOrder = reverseOrientation ? [...positionOption].reverse() : positionOption;
      posotionOrder.forEach((tile, i, array) => {
        const nextTile = array[i + 1];
        if (nextTile && tile.value === nextTile.value) {
          array.splice(i + 1, 1);
          tile.value *= 2;
          setGameData((prev) => {
            const newScore = prev.score + tile.value;
            const newObj = { ...prev, score: newScore };
            if (newScore > prev.highScore) {
              updateHighScore(newScore);
              newObj.highScore = newScore;
            }
            return newObj;
          });
        }
        newTileData.push({ ...tile, [positionKey]: loopOrder[0] });
        loopOrder.shift();
      });
    }
  });

  return newTileData;
};

const didTilesMove = (oldData, newData) => {
  const changedTile = oldData.find((oldTile) => {
    let tileChanged = true;
    const newTile = newData.find((tile) => tile.id === oldTile.id);
    if (!newTile) {
      tileChanged = true;
    } else if (newTile.x === oldTile.x && newTile.y === oldTile.y && newTile.value === oldTile.value) {
      tileChanged = false;
    }
    return tileChanged;
  });
  return !!changedTile;
};

export const createRandomTile = (gameData, newTileData, oldTileData) => {
  if (!didTilesMove(oldTileData, newTileData) && oldTileData.length) {
    return null;
  }
  const value = [2, 4][Math.floor(Math.random() * 2)];
  const createPosibilities = [];
  Array.from(new Array(gameData.yValue)).forEach((_, y) => {
    Array.from(new Array(gameData.xValue)).forEach((_, x) => {
      createPosibilities.push({ x, y });
    });
  });
  const emptySpots = createPosibilities.filter((posibility) => {
    return !newTileData.find((tile) => tile.x === posibility.x && tile.y === posibility.y);
  });
  const randomEmptySpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  return randomEmptySpot && { ...randomEmptySpot, value, id: v4() };
};

export const defaultTileData = () => {
  return [
    { value: 0, x: 0, y: 0, id: v4() },
    { value: 2, x: 0, y: 1, id: v4() },
    { value: 4, x: 0, y: 2, id: v4() },
    { value: 8, x: 0, y: 3, id: v4() },
    { value: 16, x: 1, y: 0, id: v4() },
    { value: 32, x: 1, y: 1, id: v4() },
    { value: 64, x: 1, y: 2, id: v4() },
    { value: 128, x: 1, y: 3, id: v4() },
    { value: 256, x: 2, y: 0, id: v4() },
    { value: 512, x: 2, y: 1, id: v4() },
    { value: 1024, x: 2, y: 2, id: v4() },
    { value: 2048, x: 2, y: 3, id: v4() },
    { value: 4096, x: 3, y: 0, id: v4() },
  ];
};
