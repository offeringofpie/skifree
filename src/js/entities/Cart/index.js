import Obstacle from '../Obstacle';
import {globals} from '../../globals';

const sprite = [
  {
    name: 'cart two',
    x: 103,
    y: 635,
    width: 102,
    height: 112
  }, {
    name: 'cart one',
    x: 204,
    y: 635,
    width: 102,
    height: 112
  }, {
    name: 'cart',
    x: 307,
    y: 635,
    width: 102,
    height: 112
  }
];

export default class Cart extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = Math.floor(Math.random()*this.sprite.length);
    this.position.x = this.globals.canvas.width-500;
  }
}
