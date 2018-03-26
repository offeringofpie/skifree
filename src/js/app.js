import { h, render } from 'preact';
import Game from './classes/Game';
import Scoreboard from './components/scoreboard.jsx';


const game = new Game();
game.init();

render(
  <div>
    <Scoreboard />
  </div>
  , document.querySelector('#root'));
