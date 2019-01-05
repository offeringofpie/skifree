import { globals, store } from '../../globals';
import draw from '../../functions/draw';

const sprite = [
  {
    name: 'run1',
    x: 408,
    y: 584,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'run2',
    x: 534,
    y: 584,
    width: 126,
    height: 165,
    animation: -1
  },
  {
    name: 'catching1',
    x: 660,
    y: 580,
    width: 126,
    height: 169,
    animation: 1
  },
  {
    name: 'catching2',
    x: 786,
    y: 580,
    width: 126,
    height: 166,
    animation: -1
  },
  {
    name: 'catching3',
    x: 752,
    y: 764,
    width: 126,
    height: 166,
    animation: 1
  },
  {
    name: 'catching4',
    x: 878,
    y: 745,
    width: 126,
    height: 169,
    animation: -1
  },
  {
    name: 'eating1',
    x: 0,
    y: 752,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'eating2',
    x: 126,
    y: 752,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'eating3',
    x: 252,
    y: 752,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'eating4',
    x: 378,
    y: 752,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'toothpick1',
    x: 504,
    y: 752,
    width: 126,
    height: 165,
    animation: 1
  },
  {
    name: 'toothpick2',
    x: 626,
    y: 752,
    width: 126,
    height: 165,
    animation: -1
  }
];

export default class Yeti {
  constructor(x = 0, y = 0, direction = 0) {
    this.state = store.getState();
    this.globals = globals;
    this.sprite = sprite;
    this.direction = direction;
    this.position = {
      x: this.globals.canvas.width/2 * Math.random(),
      y: y
    };
    this.buffer = 0;
    this.summoned = 0;
    this.eating = 0;
  }

  init() {
    this.summoned = 1;
    this.update();
  }

  reset() {
    this.buffer = 0;
    this.eating = 0;
    this.summoned = 0;
    this.direction = 0;
    this.position = {
      x: 0,
      y: 0
    };
  }

  eat() {
    if (this.direction <= 5) {this.direction = 6;}
    store.dispatch({type: 'PLAYER_EATEN', payload: 1});
  }

  draw() {
    draw(this.sprite[this.direction], this.position.x, this.position.y);
  }

  update(deltaTime) {
    this.state = store.getState();

    if (this.summoned) {
      let animationSpeed = this.eating ? 2 : 1;

      if (this.buffer > 16) {
        this.direction+= this.sprite[this.direction].animation;
        this.buffer = 0;
      }

      let speedX = (this.position.x <= this.state.player.position.x) ?
         (6 - this.state.speed.x)/8 :
        -(4 - this.state.speed.x)/8;

      let speedY = (this.position.y <= this.state.player.position.y) ?
         (10 - this.state.speed.y)/8 :
        -(10 + this.state.speed.y)/8;

      if (this.position.y >= this.state.player.position.y - 10 &&
        this.position.y <= this.state.player.position.y + 10 &&
        this.position.x >= this.state.player.position.x - 10 &&
        this.position.x <= this.state.player.position.x + 10) {
          this.eat();
      } else {
        this.position.x += speedX;
        this.position.y += speedY;
  
        if (this.position.x >= this.state.player.position.x - 150) {
          if (this.direction <= 1) {
            this.direction = 2;
          }
        } else if (this.position.x >= this.state.player.position.x && this.position.x <= this.state.player.position.x + 250) {
          if (this.direction <= 3) {
            this.direction = 4;
          }
        }
      }
      this.eating = this.state.player.eaten;
      this.buffer += animationSpeed;
      this.draw();
    }
  }
}
