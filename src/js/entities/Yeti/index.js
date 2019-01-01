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
      x: x,
      y: y
    };
    this.buffer = 0;
    this.summoned = 0;
  }

  init() {
    this.summoned = 1;
    this.update();
  }

  eat() {
    // here be how the player is eaten
  }

  draw() {
    draw(this.sprite[this.direction], this.position.x, this.position.y);
  }

  update(deltaTime) {
    this.state = store.getState();

    if (this.summoned) {
      if (this.buffer > 8) {
        this.direction+= this.sprite[this.direction].animation;
        this.buffer = 0;
      }
  
      this.position.x++;
      this.position.y++;
  
      this.buffer++;
      this.draw();
    }
  }
}
