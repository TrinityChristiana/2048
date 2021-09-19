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

export const getBoardInformation = (gameData, tileData) => {
  const rows = getRows(gameData, tileData);
  const columns = getColumns(gameData, tileData);
  const rowOrder = [...Array(gameData.yValue).keys()];
  const columnOrder = [...Array(gameData.xValue).keys()];

  return { rows, columns, rowOrder, columnOrder };
};
