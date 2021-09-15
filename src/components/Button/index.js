import { DOWN, LEFT, RIGHT, UP } from '../../constants';
import { Button } from 'reactstrap';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'react-feather';

const Buttons = ({ handleAction }) => {
  return (
    <>
      <div className='d-flex flex-column'>
        <div className='d-flex'>
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
          <Button style={{ height: 50, width: 50 }} onClick={() => handleAction(UP)}>
            <ArrowUp />
          </Button>
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
        </div>
        <div className='d-flex'>
          <Button style={{ height: 50, width: 50 }} onClick={() => handleAction(LEFT)}>
            <ArrowLeft />
          </Button>

          <div style={{ height: 50, width: 50, clear: 'both' }}></div>
          <Button style={{ height: 50, width: 50 }} onClick={() => handleAction(RIGHT)}>
            <ArrowRight />
          </Button>
        </div>
        <div className='d-flex'>
          {' '}
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
          <Button style={{ height: 50, width: 50 }} onClick={() => handleAction(DOWN)}>
            <ArrowDown />
          </Button>{' '}
          <div style={{ height: 50, width: 50, clear: 'both' }}> </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
