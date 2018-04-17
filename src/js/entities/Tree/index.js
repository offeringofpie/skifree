import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'tree',
    x: 925,
    y: 129,
    width: 112,
    height: 127,
    flipped: 0
  }
];

export default class Tree extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
  }
}
