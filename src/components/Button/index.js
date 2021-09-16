import { DOWN, LEFT, RIGHT, UP, START } from '../../constants';
import { Button } from 'reactstrap';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RefreshCcw } from 'react-feather';
import './buttons.scss';
const Buttons = ({ handleAction }) => {
  return (
    <div className='d-flex'>
      <div className='d-flex m-3 flex-column'>
        <div className='d-flex'>
          <div className='direction-button-spacer'></div>
          <Button className='app-button direction-button' onClick={() => handleAction(UP)}>
            <ArrowUp />
          </Button>
          <div className='direction-button-spacer'></div>
        </div>
        <div className='d-flex'>
          <Button className='app-button direction-button' onClick={() => handleAction(LEFT)}>
            <ArrowLeft />
          </Button>

          <div className='direction-button-spacer'></div>
          <Button className='app-button direction-button' onClick={() => handleAction(RIGHT)}>
            <ArrowRight />
          </Button>
        </div>
        <div className='d-flex'>
          {' '}
          <div className='direction-button-spacer'></div>
          <Button className='app-button direction-button' onClick={() => handleAction(DOWN)}>
            <ArrowDown />
          </Button>{' '}
          <div className='direction-button-spacer'></div>
        </div>
      </div>
      <div className='m-3 align-self-center'>
        <Button className='app-button' onClick={() => handleAction(START)}>
          Restart <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
