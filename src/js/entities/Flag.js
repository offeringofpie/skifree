import {store} from '../globals';

const sprite = [
  {
    name: 'green-east',
    x: 608,
    y: 137,
    width: 44,
    height: 107
  }, {
    name: 'green-west',
    x: 652,
    y: 137,
    width: 44,
    height: 107
  }, {
    name: 'finish-east',
    x: 706,
    y: 137,
    width: 75,
    height: 106
  }, {
    name: 'finish-west',
    x: 781,
    y: 137,
    width: 75,
    height: 106
  }
];

export default class Flag {
  constructor(x= 0, y = 0, direction = 0) {
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = direction;
    this.position = {
      x: x,
      y: y // setting default position below the player sprite
    };
    this.hit = 0;
  }
}
