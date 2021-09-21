import './tile.scss';
const Tile = ({ value, size, fontSize }) => {
  return (
    <span className={`tile tile-num-${value > 2048 ? 'super' : value} tile-num-size--${fontSize}`} style={{ height: size, width: size }}>
      {value}
    </span>
  );
};

export default Tile;
