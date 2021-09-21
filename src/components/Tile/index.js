import './tile.scss';
const Tile = ({ value, size }) => {
  return (
    <span className={`tile tile-num-${value > 2048 ? 'super' : value}`} style={{ height: size, width: size }}>
      {value}
    </span>
  );
};

export default Tile;
