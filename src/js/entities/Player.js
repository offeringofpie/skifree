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
    name: 'ouch',
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

/**
 * Class Player
 * @constructor
 * @param {object} globals - represents the global object
 * @param {boolean} moving - if the player is moving
 * @param {integer} speed - Player speed
 * @param {object} sprite - Player sprite
 * @param {integer} direction - Player sprite position
 * @param {object} position - Player position in the canvas
 */
export default class Player {
  /* constructor */
  constructor() {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = this.globals.player.direction;
    this.position = {
      x: this.globals.canvas.width/2,
      y: 100
    };
    this.hit = 0;
  }

  /* draw */
  draw() {
    let posX = this.position.x;
    if (this.sprite[this.direction].name == 'ouch') {
      posX = this.position.x + this.sprite[this.direction].width/8;
    }
    draw(this.sprite[this.direction],posX,this.position.y);
  }

  /* update */
  update() {
    const state = store.getState();
    if (this.direction !== state.player.direction) {
      this.direction = state.player.direction;
    }

    this.draw();
  }

  reset() {
    this.direction = 5;
    this.draw();
  }
}
