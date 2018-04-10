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

export default class Player {
  /* constructor */
  constructor() {
    this.globals = globals;
    this.moving = false;
    this.speed = 0;
    this.jumping = 0;
    this.gravity = 8;
    this.sprite = sprite;
    this.direction = this.globals.player.direction;
    this.strangth = 0;
    this.position = {
      x: this.globals.canvas.width/2,
      y: 200
    };
    this.hit = 0;
    this.flip = 0;
    this.buffer = 0;
  }

  draw() {
    let posX = this.position.x;
    if (this.sprite[this.direction].name.match(/ouch|getup|jump/)) {
      posX = this.position.x + this.sprite[this.direction].width/8;
    }
    draw(this.sprite[this.direction],posX,this.position.y);
  }

  jump(height = 25) {
    if (this.buffer <= height) {
      this.position.y = 200+this.gravity - Math.floor(height*Math.sin(this.buffer*Math.PI/height))-this.gravity;
      this.buffer++;
    } else {
      this.buffer = 0;
      this.position.y = 200;
      store.dispatch({type: 'PLAYER_JUMP', payload: {jumping:0,strength:0, flip:0}});

      if (this.direction > 11 && this.direction < 14) {
        store.dispatch({type: 'PLAYER_HIT', payload: 1});
      } else {
        store.dispatch({type: 'PLAYER_SPRITE', payload: 5});
      }
    }
  }

  update(deltaTime) {
    const state = store.getState();

    if (state.player.jumping) {
      store.dispatch({type: 'PLAYER_SPRITE', payload: 11+state.player.flip});
      if (!this.buffer) {
        this.strength = state.player.strength
      }
      this.jump(this.strength);
    } else if (state.player.hit) {
      this.buffer++;

      if (this.buffer >= 90) {
        store.dispatch({type: 'PLAYER_SPRITE', payload: 15});
        this.buffer = 0;
      }
    }

    this.hit = state.player.hit;
    this.jumping = state.player.jumping;
    this.direction = state.player.direction;
    this.flip = state.player.flip;
    this.draw();
  }

  reset() {
    this.hit = 0;
    this.direction = 5;
    this.draw();
  }
}
