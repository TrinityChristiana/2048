import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { START } from '../../constants';
import { defaultGameData, handleAction } from '../../utils';
import Board from '../Board';
import Header from '../Header';

const Game = () => {
  const [gameData, setGameData] = useState(defaultGameData());
  const [tileData, setTileData] = useState([]);

  const handleUpdateAction = useCallback(
    (eventType) => {
      handleAction(eventType, setGameData, gameData, tileData, setTileData);
    },
    [gameData, tileData]
  );
  const handlers = useSwipeable({
    onSwiped: (eventData) => handleUpdateAction(eventData.dir),
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
  });

  const handleKeyDown = useCallback(
    (e) => {
      const code = e.code;
      if (code.includes('Arrow')) {
        // disables page scrolling with keyboard arrows
        e.preventDefault();
        handleUpdateAction(code.split('Arrow')[1]);
      }
    },
    [handleUpdateAction]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    handleUpdateAction(START);
    // eslint-disable-next-line
  }, []);

  return (
    <div {...handlers} className='d-flex flex-column align-items-center' style={{ width: '100%', height: '100vh' }}>
      <Header {...gameData} handleUpdateAction={handleUpdateAction} />
      <Board tileData={tileData} gameData={gameData} />
    </div>
  );
};

export default Game;
