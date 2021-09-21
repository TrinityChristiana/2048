import { useEffect, useState } from 'react';
import Tile from '../Tile';

const Grid = ({ tileData, gameData, screenWidth }) => {
  const [gridHTML, setGridHTML] = useState(<div>Loading...</div>);

  useEffect(() => {
    const normalHeight = 816;
    const [tileSize, gridSize] = screenWidth >= normalHeight ? [(normalHeight - 16) / 4, normalHeight] : [(screenWidth - 16) / 4, screenWidth];
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
              return <Tile key={`${x}-${y}`} size={tileSize} value={tile ? tile.value : 0} />;
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
