import {store} from '../globals';

const sprite = [
  {
    name: 'snow',
    x: 1002,
    y: 260,
    width: 253,
    height: 124,
    flipped: 0
  }
];

const globals = store.getState();

export default class SnowBig {
  constructor(y = 0) {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = 0;
    this.position = {
      x: this.globals.canvas.width*Math.random(),
      y: y ? y : this.globals.canvas.height*Math.random()
    };
    this.hit = 0;
  }
}
