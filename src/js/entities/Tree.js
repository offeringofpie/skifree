import {store} from '../globals';

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

const globals = store.getState();

export default class Tree {
  constructor(y = 0) {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = 0;
    this.position = {
      x: this.globals.canvas.width*Math.random(),
      y: y ? y : this.globals.canvas.height*Math.random()
    }
  }
}
