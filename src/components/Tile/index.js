import './tile.scss';
const Tile = ({ value }) => {
  return (
    <span className={`tile-num-${value} text-center`} style={{ width: 100, height: 100, fontSize: 48, border: '8px solid #bbada0' }}>
      {value}
    </span>
  );
};

export default Tile;
