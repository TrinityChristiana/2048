import { RefreshCcw } from 'react-feather';
import { Button } from 'reactstrap';
import { START } from '../../constants';

const Score = ({ highScore, score, handleUpdateAction }) => {
  return (
    <div className='d-flex'>
      <div>2048</div>
      <div>
        <div>Score</div>
        <div>{score}</div>
      </div>
      <div>
        <div>High Score</div>
        <div>{highScore}</div>
      </div>
      <div>
        <Button onClick={() => handleUpdateAction(START)} className='app-button'>
          Restart <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default Score;
