import Obstacle from '../Obstacle';
import {globals} from '../../globals';

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
    this.sprite = sprite;
    this.direction = 0;
    this.position.x = this.globals.canvas.width-500;
  }
}
