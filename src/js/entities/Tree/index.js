import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'tree',
    x: 925,
    y: 129,
    width: 112,
    height: 127
  },
  {
    name: 'tree fire',
    x: 1051,
    y: 643,
    width: 86,
    height: 106
  },
  {
    name: 'tree big',
    x: 1136,
    y: 494,
    width: 125,
    height: 254
  }
];

export default class Tree extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = Math.floor(Math.random() * this.sprite.length);
  }
}
