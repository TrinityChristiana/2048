import { DOWN, LEFT, RIGHT, START, UP } from '../constants';
import { getBoardInformation } from './boardUtils';
import { createNewTileData, createRandomTile } from './tileUtils';

export const defaultGameData = () => {
  return { xValue: 4, yValue: 4, score: 0, highScore: 0 };
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
