import { useEffect } from 'react';
import './App.scss';
import Game from './components/Game';
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
