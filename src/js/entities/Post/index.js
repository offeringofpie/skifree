import Obstacle from '../Obstacle';
import { globals, store } from '../../globals';

const sprite = [
  {
    name: 'post',
    x: 0,
    y: 502,
    width: 95,
    height: 247
  }
];

export default class Post extends Obstacle {
  constructor(...args) {
    super(...args);
    this.state = store.getState();
    this.sprite = sprite;
    this.direction = 0;
    this.position.x = this.globals.canvas.width/2 - this.state.game.center + 300;
  }
}
