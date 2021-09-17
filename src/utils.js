import { v4 } from 'uuid';
import { DOWN, LEFT, RIGHT, START, UP } from './constants';

export const defaultGameData = () => {
  getHighScore();
  return { xValue: 4, yValue: 4, score: 0, highScore: getHighScore() };
};
export const getRows = (gameData, tileData) => {
  const rows = Array.from(new Array(gameData.xValue)).map((_, x) => {
    const rowData = [];
    Array.from(new Array(gameData.yValue)).forEach((_, y) => {
      const singleTile = tileData.find((tile) => tile.x === x && tile.y === y);
      if (singleTile) {
        rowData.push(singleTile);
      }
    });
    return rowData;
  });

  return rows;
};
export const getColumns = (gameData, tileData) => {
  const columns = Array.from(new Array(gameData.yValue)).map((_, y) => {
    const columnData = [];
    Array.from(new Array(gameData.xValue)).forEach((_, x) => {
      const singleTile = tileData.find((tile) => tile.x === x && tile.y === y);
      if (singleTile) {
        columnData.push(singleTile);
      }
    });
    return columnData;
  });

  return columns;
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

// export const defaultTileData = (gameData) => {
//   const values = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2040, 4096];

//   const tileData = [];

//   values.forEach((item, i, array) => {
//     console.log(array);
//   });
//   const [x, y] = [Math.floor(Math.random() * gameData.xValue), Math.floor(Math.random() * gameData.yValue)];
//   const value = [2, 4][Math.floor(Math.random() * 2)];
//   return [
//     { value: 0, x: 0, y: 0, id: v4() },
//     { value: 2, x: 0, y: 1, id: v4() },
//     { value: 4, x: 0, y: 2, id: v4() },
//     { value: 8, x: 0, y: 3, id: v4() },
//     { value: 16, x: 1, y: 0, id: v4() },
//     { value: 32, x: 1, y: 1, id: v4() },
//     { value: 64, x: 1, y: 2, id: v4() },
//     { value: 128, x: 1, y: 3, id: v4() },
//     { value: 256, x: 2, y: 0, id: v4() },
//     { value: 512, x: 2, y: 1, id: v4() },
//     { value: 1024, x: 2, y: 2, id: v4() },
//     { value: 2048, x: 2, y: 3, id: v4() },
//     { value: 4096, x: 3, y: 0, id: v4() },
//   ];
// };

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

export const getBoardInformation = (gameData, tileData) => {
  const rows = getRows(gameData, tileData);
  const columns = getColumns(gameData, tileData);
  const rowOrder = [...Array(gameData.yValue).keys()];
  const columnOrder = [...Array(gameData.xValue).keys()];

  return { rows, columns, rowOrder, columnOrder };
};

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

export const handleAction = (actionType, setGameData, gameData, tileData, setTileData) => {
  const { rows, columns, rowOrder, columnOrder } = getBoardInformation(gameData, tileData);
  let newTileData = [];
  switch (actionType) {
    case UP:
      newTileData = createNewTileData({
        orientationData: columns,
        orientationOrder: columnOrder,
        reverseOrientation: false,
        setGameData,
        positionKey: 'x',
      });
      break;
    case DOWN:
      newTileData = createNewTileData({
        orientationData: columns,
        orientationOrder: [...columnOrder].reverse(),
        reverseOrientation: true,
        setGameData,
        positionKey: 'x',
      });
      break;
    case LEFT:
      newTileData = createNewTileData({
        orientationData: rows,
        orientationOrder: rowOrder,
        reverseOrientation: false,
        setGameData,
        positionKey: 'y',
      });
      break;
    case RIGHT:
      newTileData = createNewTileData({
        orientationData: rows,
        orientationOrder: [...rowOrder].reverse(),
        reverseOrientation: true,
        setGameData,
        positionKey: 'y',
      });
      break;
    case START:
      newTileData = [];
      setGameData((prev) => ({ ...prev, score: 0 }));
      break;
    default:
      newTileData = tileData;
  }

  const newTile = createRandomTile(gameData, newTileData, tileData);
  newTile && newTileData.push(newTile);
  setTileData(newTileData);
};
