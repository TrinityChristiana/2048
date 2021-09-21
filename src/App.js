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
  return (
    <>
      <a href='https://github.com/TrinityChristiana/2048' target='_blank' rel="noreferrer">
        README.md
      </a>
      <Game />
    </>
  );
}

export default App;
