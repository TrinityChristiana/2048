import { useEffect, useState } from 'react';
import Tile from '../Tile';

const Grid = ({ tileData, gameData }) => {
  const [gridHTML, setGridHTML] = useState(<div>Hell othere!</div>);

  useEffect(() => {
    let tempHTML = (
      <div style={{ width: 416, border: '8px solid #bbada0', backgroundColor: '#bbada0', margin: 14}}>
        {Array.from(new Array(gameData.xValue)).map((_, x) => (
          <div key={`grid-${x}`} className='d-flex'>
            {Array.from(new Array(gameData.yValue)).map((_, y) => {
              const tile = tileData.find((element) => element.x === x && element.y === y);
              return <Tile value={tile ? tile.value : 0} />;
            })}
          </div>
        ))}
      </div>
    );
    setGridHTML(tempHTML);
  }, [gameData, tileData]);

  return <> {gridHTML} </>;
};

export default Grid;
