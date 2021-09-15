import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { v4 } from 'uuid';
import { DOWN, LEFT, RIGHT, UP } from '../../constants';
import { createRandomTile, getColumns, getRows } from '../../utils';
import Board from '../Board';
import Buttons from '../Button';

const defaultTileData = (gameData) => {
  const [x, y] = [Math.floor(Math.random() * gameData.xValue), Math.floor(Math.random() * gameData.yValue)];
  const value = [2, 4][Math.floor(Math.random() * 2)];
  return [{ value, x, y, id: v4() }];
};
const defaultGameData = () => {
  return { xValue: 4, yValue: 4 };
};
const Game = () => {
  const [gameData] = useState(defaultGameData());
  const [tileData, setTileData] = useState(defaultTileData(defaultGameData()));

  const handleAction = useCallback(
    (actionType) => {
      const rows = getRows(gameData, tileData);
      const columns = getColumns(gameData, tileData);
      const rowOrder = [...Array(gameData.yValue).keys()];
      const columnOrder = [...Array(gameData.xValue).keys()];
      let newTileData = [];
      switch (actionType) {
        case UP:
          columns.forEach((column) => {
            const loopOrder = [...columnOrder];
            if (column.length) {
              column.forEach((tile, i, array) => {
                const nextTile = array[i + 1];
                if (nextTile && tile.value === nextTile.value) {
                  array.splice(i + 1, 1);
                  tile.value *= 2;
                }
                newTileData.push({ ...tile, x: loopOrder[0] });
                loopOrder.shift();
              });
            }
          });
          break;
        case DOWN:
          columns.forEach((column) => {
            const loopOrder = [...columnOrder].reverse();
            if (column.length) {
              [...column].reverse().forEach((tile, i, array) => {
                const nextTile = array[i + 1];
                if (nextTile && tile.value === nextTile.value) {
                  array.splice(i + 1, 1);
                  tile.value *= 2;
                }
                newTileData.push({ ...tile, x: loopOrder[0] });
                loopOrder.shift();
              });
            }
          });
          break;
        case LEFT:
          rows.forEach((row) => {
            const loopOrder = [...rowOrder];
            if (row.length) {
              row.forEach((tile, i, array) => {
                const nextTile = array[i + 1];
                if (nextTile && tile.value === nextTile.value) {
                  array.splice(i + 1, 1);
                  tile.value *= 2;
                }
                newTileData.push({ ...tile, y: loopOrder[0] });
                loopOrder.shift();
              });
            }
          });
          break;
        case RIGHT:
          rows.forEach((row) => {
            const loopOrder = [...rowOrder].reverse();
            if (row.length) {
              [...row].reverse().forEach((tile, i, array) => {
                const nextTile = array[i + 1];
                if (nextTile && tile.value === nextTile.value) {
                  array.splice(i + 1, 1);
                  tile.value *= 2;
                }
                newTileData.push({ ...tile, y: loopOrder[0] });
                loopOrder.shift();
              });
            }
          });
          break;
        default:
          newTileData = tileData;
      }

      if (!!newTileData.find((tile) => tile.value === 2048)) {
        newTileData = [];
      }
      const newTile = createRandomTile(gameData, newTileData);
      newTile && newTileData.push(newTile);
      setTileData(newTileData);
    },
    [gameData, tileData]
  );

  const handlers = useSwipeable({
    onSwiped: (eventData) => handleAction(eventData.dir),
  });

  const handleKeyDown = useCallback(
    (e) => {
      e.preventDefault();
      if (e.code.includes('Arrow')) {
        // disables page scrolling with keyboard arrows
        switch (e.code) {
          case 'ArrowLeft':
            handleAction(LEFT);
            break;
          case 'ArrowRight':
            handleAction(RIGHT);
            break;
          case 'ArrowUp':
            handleAction(UP);
            break;
          case 'ArrowDown':
            handleAction(DOWN);
            break;
          default:
            console.warn('Nothing to do');
        }
      }
    },
    [handleAction]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div {...handlers}>
      <Board tileData={tileData} gameData={gameData} />
      <Buttons handleAction={handleAction} tileData={tileData} setTileData={setTileData} gameData={gameData} />
    </div>
  );
};

export default Game;
