import './tile.scss';
const Tile = ({ value }) => {
  return <span className={`tile tile-num-${value > 2048 ? 'super' : value}`}>{value}</span>;
};

export default Tile;
