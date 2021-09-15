import { DOWN, LEFT, RIGHT, UP } from '../../constants';

const Buttons = ({ handleAction }) => {
  return (
    <>
      <div className='d-flex flex-column'>
        <div className='d-flex'>
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
          <button style={{ height: 50, width: 50 }} onClick={() => handleAction(UP)}>
            Up
          </button>
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
        </div>
        <div className='d-flex'>
          <button style={{ height: 50, width: 50 }} onClick={() => handleAction(LEFT)}>
            Left
          </button>
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
          <button style={{ height: 50, width: 50 }} onClick={() => handleAction(RIGHT)}>
            Right
          </button>
        </div>
        <div className='d-flex'>
          {' '}
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
          <button style={{ height: 50, width: 50 }} onClick={() => handleAction(DOWN)}>
            Down
          </button>{' '}
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
