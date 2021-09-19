import Game from './components/Game';
import './App.scss';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

  }, []);
  return <Game />;
}

export default App;
