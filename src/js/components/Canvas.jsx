import { h, Component } from 'preact';
import { globals } from '../globals';
import Game from '../classes/Game';



export default class Canvas extends Component {
  componentDidMount() {
    globals.canvas = document.querySelector('canvas');
    globals.context = document.querySelector('canvas').getContext('2d');

    let game = new Game();
    game.init();
  }
  render() {
    return (
      <canvas id="canvas" width="300" height="300"></canvas>
    );
  }
}
