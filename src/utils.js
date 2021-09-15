import { v4 } from 'uuid';

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

export const createRandomTile = (gameData, tileData) => {
  const value = [2, 4][Math.floor(Math.random() * 2)];
  const createPosibilities = [];
  Array.from(new Array(gameData.yValue)).forEach((_, y) => {
    Array.from(new Array(gameData.xValue)).forEach((_, x) => {
      createPosibilities.push({ x, y });
    });
  });
  const emptySpots = createPosibilities.filter((posibility) => {
    return !tileData.find((tile) => tile.x === posibility.x && tile.y === posibility.y);
  });
  const randomEmptySpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  return randomEmptySpot && { ...randomEmptySpot, value, id: v4() };
};
