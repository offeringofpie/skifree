import { globals } from '../../globals';

export default class Obstacle {
  constructor(y = 0, id = 0) {
    this.globals = globals;
    this.moving = false;
    this.id = id;
    this.speed = 0;
    this.sprite = [];
    this.direction = 0;
    this.position = {
      x: this.globals.canvas.clientWidth * Math.random(),
      // setting default position below the player sprite
      y: y ? y : Math.max(300, this.globals.canvas.height + this.globals.canvas.height * Math.random())
    };
    this.hit = 1;
  }
}
