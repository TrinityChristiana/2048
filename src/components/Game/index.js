import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { START } from '../../constants';
import { checkScreenSize } from '../../helpers/events';
import { handleAction } from '../../helpers/gameUtils';
import { getGameData, getTileData, updateGameData, updateTileData, watchStorage } from '../../helpers/localStorageUtils';
import Board from '../Board';
import Header from '../Header';

const screenIsSmall = (size) => {
  return size < 536;
};
const Game = () => {
  const [gameData, setGameData] = useState(getGameData());
  const [tileData, setTileData] = useState([]);
  const [smallScreen, setSmallScreen] = useState(screenIsSmall(window.innerHeight));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    window.addEventListener('resize', () => {
      checkScreenSize(setSmallScreen, setScreenWidth);
    });
    window.addEventListener('orientationchange', () => checkScreenSize(setSmallScreen, setScreenWidth), false);
    window.addEventListener('storage', watchStorage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [tileData, gameData]);

  useEffect(() => {
    const savedTileData = getTileData();
    if (savedTileData.length) {
      setTileData(savedTileData);
    } else {
      handleUpdateAction(START);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tileData.length && updateTileData(tileData);
  }, [tileData]);

  useEffect(() => {
    gameData && updateGameData(gameData);
  }, [gameData]);

  return (
    <div {...handlers} className={`d-flex ${!smallScreen ? 'flex-column align-items-center' : 'flex-row'}`} style={!smallScreen ? { width: '100%', height: '100vh' } : { marginLeft: 10, marginRight: 10 }}>
      <Header {...gameData} screenWidth={screenWidth} handleUpdateAction={handleUpdateAction} />
      <Board screenWidth={screenWidth} tileData={tileData} gameData={gameData} />
    </div>
  );
};

export default Game;
