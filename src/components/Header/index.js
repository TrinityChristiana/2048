import { RefreshCcw } from 'react-feather';
import { Button } from 'reactstrap';
import { START } from '../../constants';
import './header.scss';

const Score = ({ highScore, score, handleUpdateAction }) => {
  return (
    <div className='header-container'>
      <div className="header-title-container">
        <div className='header-title'>2048</div>
      </div>
      <div className="header-info-container">
        <div className='all-scores-container'>
          <div className='score-container'>
            <div className='score-contents'>
              <div className='score-title'>Score</div>
              <div className='score-value'>{score}</div>
            </div>
          </div>
          <div className='score-container'>
            <div className='score-contents'>
              <div className='score-title'>High Score</div>
              <div className='score-value'>{highScore}</div>
            </div>
          </div>
        </div>
        <div className="reset-button-container">
          <Button onClick={() => handleUpdateAction(START)} className='app-button'>
            Restart <RefreshCcw />
          </Button>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Score;
