import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { DOWN, LEFT, RIGHT, START, UP, WIN } from '../../constants';
import { createRandomTile, getColumns, getRows } from '../../utils';
import Board from '../Board';
import Buttons from '../Button';

// const defaultTileData = (gameData) => {
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
const defaultGameData = () => {
  return { xValue: 4, yValue: 4 };
};
const Game = () => {
  const [gameData] = useState(defaultGameData());
  const [tileData, setTileData] = useState([]);

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
        case START:
          newTileData = [];
          break;
        case WIN:
          newTileData = tileData;
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
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
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

  useEffect(() => {
    handleAction(START);
  }, []);

  return (
    <div {...handlers} className='d-flex flex-column align-items-center' style={{ width: '100%' }}>
      <Board tileData={tileData} gameData={gameData} />
      <Buttons handleAction={handleAction} tileData={tileData} setTileData={setTileData} gameData={gameData} />
    </div>
  );
};

export default Game;
