import { Provider } from 'preact-redux';
import { h, render } from 'preact';
import { store } from './globals';
import Game from './classes/Game';
import Scoreboard from './components/scoreboard.jsx';

const game = new Game();
game.init();

render(
  <Provider store={store}>
    <Scoreboard />
  </Provider>,
  document.querySelector('#root')
);
