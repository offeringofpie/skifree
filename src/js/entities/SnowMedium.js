import {store} from '../globals';

const sprite = [
  {
    name: 'snow',
    x: 901,
    y: 353,
    width: 96,
    height: 32,
    flipped: 0
  }
];

const globals = store.getState();

export default class SnowMedium {
  constructor(y = 0) {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = 0;
    this.position = {
      x: this.globals.canvas.width*Math.random(),
      y: y ? y : Math.max(300, this.globals.canvas.height + this.globals.canvas.height*Math.random()) // setting default position below the player sprite
    };
    this.hit = 0;
  }
}
