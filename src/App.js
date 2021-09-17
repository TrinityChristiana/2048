import Game from './components/Game';
import './App.scss';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation()
    });
    // $(function () {
    //   $(document).on('touchmove', function (evt) {
    //     evt.preventDefault();
    //   });
    //   $(document).on('touchmove', '.scrollable', function (evt) {
    //     evt.stopPropagation();
    //   });
    // });
  }, []);
  return <Game />;
}

export default App;
