import {globals, store} from '../globals';
import draw from '../functions/draw';

import Tree from '../entities/Tree';
import Rock from '../entities/Rock';
import Ramp from '../entities/Ramp';
import Post from '../entities/Post';
import Cart from '../entities/Cart';
import Snow from '../entities/Snow';

export default class Obstacles {
  constructor() {
    this.obstacles = [];
  }

  init() {
    const quantity = (globals.canvas.width > 800)
      ? 20
      : 10;
    for (let o = 0; o < quantity; o++) {
      this.add();
    }
  }

  add(y = 0) {
    const luckyNumber = Math.random();

    if (luckyNumber > 0.8) {
      this.obstacles.push(new Tree(y));
    } else if (luckyNumber > 0.5) {
      this.obstacles.push(new Rock(y));
    } else if (luckyNumber > 0.3) {
      this.obstacles.push(new Snow(y));
    } else if (luckyNumber > 0.1) {
      this.obstacles.push(new Ramp(y));
    } else if (luckyNumber > 0.05) {
      this.obstacles.push(new Post(y));
    } else {
      this.obstacles.push(new Cart(y));
    }
  }

  clear() {
    this.obstacles = [];
  }

  draw() {
    this.obstacles.forEach((obstacle, i) => {
      if (obstacle.position.y <= -100) {
        this.obstacles.splice(i, 1);
        this.add();
      } else if (obstacle.position.x <= 0) {
        this.obstacles.splice(i, 1);
        this.add(obstacle.position.y, globals.canvas.width);
      }

      const state = store.getState();

      obstacle.position.x -= state.speed.x;
      obstacle.position.y -= state.speed.y;
      const obstacleX = globals.canvas.width - obstacle.position.x;
      const obstacleY = obstacle.position.y;
      draw(obstacle.sprite[obstacle.direction], obstacleX, obstacleY);
    })
  }

  update() {
    this.draw();
  }
}
