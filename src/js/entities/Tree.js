import store from '../globals';

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

export default class Tree {
  constructor() {
    this.globals = store.getState();
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = 0;
    this.position = {
      x: this.globals.canvas.width*Math.random(),
      y: this.globals.canvas.height*Math.random()
    }
  }
}
