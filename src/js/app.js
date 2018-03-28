import { Provider } from 'preact-redux';
import { h, render } from 'preact';
import Game from './classes/Game';
import Scoreboard from './components/scoreboard.jsx';


const game = new Game();
game.init();

render(
    <Scoreboard />
  , document.querySelector('#root'));
