import { useEffect, useState } from 'react';
import Tile from '../Tile';

const Grid = ({ tileData, gameData, screenWidth }) => {
  const [gridHTML, setGridHTML] = useState(<div>Loading...</div>);

  useEffect(() => {
    const normalWidth = 416;
    const [tileSize, gridSize, fontSize] = screenWidth >= normalWidth ? [(normalWidth - 16) / 4, normalWidth, 100] : [(screenWidth - 16) / 4, screenWidth, Math.floor((screenWidth / normalWidth) * 100)];
    let tempHTML = (
      <div
        style={{
          width: gridSize,
          height: gridSize,
          border: '8px solid #bbada0',
          backgroundColor: '#bbada0',
        }}
      >
        {Array.from(new Array(gameData.xValue)).map((_, x) => (
          <div key={`grid-${x}`} className='d-flex'>
            {Array.from(new Array(gameData.yValue)).map((_, y) => {
              const tile = tileData.find((element) => element.x === x && element.y === y);
              return <Tile key={`${x}-${y}`} size={tileSize} fontSize={fontSize} value={tile ? tile.value : 0} />;
            })}
          </div>
        ))}
      </div>
    );
    setGridHTML(tempHTML);
  }, [gameData, tileData, screenWidth]);

  return <> {gridHTML} </>;
};

export default Grid;
