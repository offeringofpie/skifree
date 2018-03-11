import {globals,store} from '../globals';
import draw from '../functions/draw';

const sprite = [
  {
    name: 'w3',
    x: 492,
    y: 131,
    width: 90,
    height: 128,
    flipped: 1
  }, {
    name: 'w2',
    x: 386,
    y: 131,
    width: 90,
    height: 128,
    flipped: 1
  }, {
    name: 'w1',
    x: 280,
    y: 131,
    width: 82,
    height: 128,
    flipped: 1
  }, {
    name: 'sw2',
    x: 158,
    y: 131,
    width: 87,
    height: 128,
    flipped: 1
  }, {
    name: 'sw1',
    x: 88,
    y: 131,
    width: 64,
    height: 128,
    flipped: 1
  }, {
    name: 'normal',
    x: 0,
    y: 0,
    width: 60,
    height: 128,
    flipped: 0
  }, {
    name: 'se1',
    x: 88,
    y: 0,
    width: 64,
    height: 128,
    flipped: 0
  }, {
    name: 'se2',
    x: 158,
    y: 0,
    width: 87,
    height: 128,
    flipped: 0
  }, {
    name: 'e1',
    x: 275,
    y: 0,
    width: 91,
    height: 128,
    flipped: 1
  }, {
    name: 'e2',
    x: 386,
    y: 0,
    width: 90,
    height: 128,
    flipped: 1
  }, {
    name: 'e3',
    x: 492,
    y: 0,
    width: 90,
    height: 128,
    flipped: 1
  }, {
    name: 'jump',
    x: 598,
    y: 0,
    width: 126,
    height: 128,
    flipped: 1
  }, {
    name: 'flip1',
    x: 740,
    y: 0,
    width: 114,
    height: 128,
    flipped: 1
  }, {
    name: 'flip2',
    x: 871,
    y: 0,
    width: 121,
    height: 128,
    flipped: 1
  }, {
    name: 'jump',
    x: 1008,
    y: 0,
    width: 124,
    height: 128,
    flipped: 1
  }, {
    name: 'getup',
    x: 1146,
    y: 0,
    width: 123,
    height: 128,
    flipped: 1
  }
];

export default class Player {
  constructor() {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = this.globals.player.direction;
    this.position = {
      x: this.globals.canvas.width/2,
      y: 100
    }
  }

  draw() {
    this.direction = this.globals.player.direction;
    const playerX = this.globals.canvas.width - this.position.x;
    const playerY = this.position.y;
    draw(this.sprite[this.direction],playerX,playerY);
  }

  update() {
    this.draw();
  }
}
