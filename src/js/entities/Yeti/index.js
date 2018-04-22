import {globals,store} from '../../globals';
import draw from '../../functions/draw';

const sprite = [
  {
    name: 'run1',
    x: 408, y: 584,
    width: 111, height: 165
  }, {
    name: 'run2',
    x: 517, y: 584,
    width: 126, height: 165
  }, {
    name: 'catching1',
    x: 641, y: 580,
    width: 100, height: 169
  }, {
    name: 'catching2',
    x: 741, y: 580,
    width: 117, height: 166
  }, {
    name: 'catching3',
    x: 643, y: 764,
    width: 117, height: 166
  }, {
    name: 'catching4',
    x: 760, y: 745,
    width: 100, height: 169
  }, {
    name: 'eating1',
    x: 0, y: 752,
    width: 126, height: 165
  }, {
    name: 'eating2',
    x: 127, y: 752,
    width: 114, height: 165
  }, {
    name: 'eating3',
    x: 243, y: 752,
    width: 114, height: 165
  }, {
    name: 'eating4',
    x: 357, y: 752,
    width: 91, height: 165
  }, {
    name: 'toothpick1',
    x: 451, y: 769,
    width: 90, height: 165
  }, {
    name: 'toothpick2',
    x: 540, y: 769,
    width: 103, height: 165
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
  }

  init() {
    this.update();
  }

  eat() {
    // here be how the player is eaten
  }

  draw() {
    draw(this.sprite[this.direction],this.position.x,this.position.y);
  }

  update(deltaTime) {
    this.state = store.getState();
    this.draw();
  }
}
