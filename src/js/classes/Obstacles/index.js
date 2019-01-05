import {globals, store} from '../../globals';
import draw from '../../functions/draw';

import Tree from '../../entities/Tree';
import Rock from '../../entities/Rock';
import Ramp from '../../entities/Ramp';
import Post from '../../entities/Post';
import Cart from '../../entities/Cart';
import Snow from '../../entities/Snow';

export default class Obstacles {
  constructor() {
    this.obstacles = new Map();
    this.added = 0;
  }

  init() {
    this.count();
  }

  count() {
    const quantity = (globals.canvas.clientWidth > 800) ? 25 : 15;

    if (this.added < quantity) {
      for (let o = this.added; o < quantity; o++) {
        this.add();
      }
      this.added = quantity;
    }
  }


  add(y = 0) {
    const luckyNumber = Math.random();

    if (luckyNumber > 0.8) {
      this.obstacles.set('tree'+this.added, new Tree(y,'tree'+this.added));
    } else if (luckyNumber > 0.5) {
      this.obstacles.set('rock'+this.added, new Rock(y,'rock'+this.added));
    } else if (luckyNumber > 0.3) {
      this.obstacles.set('snow'+this.added, new Snow(y,'snow'+this.added));
    } else if (luckyNumber > 0.1 && !this.obstacles.has('ramp')) {
      this.obstacles.set('ramp'+this.added, new Ramp(y,'ramp'+this.added));
    } else if (luckyNumber > 0.05) {
      this.obstacles.set('post'+this.added, new Post(y,'post'+this.added));
    } else if (!this.obstacles.has('cart')) {
      this.obstacles.set('cart'+this.added, new Cart(y,'cart'+this.added));
      console.log(this.obstacles.get('cart'+this.added).hit)
    }

    this.added++;
  }

  clear() {
    this.obstacles.clear();
    this.added = 0;
    this.count();
  }

  draw() {
    this.obstacles.forEach((obstacle, i) => {
      if (obstacle.position.y <= -200) {
        this.obstacles.delete(obstacle.id);
        this.add();
      }else if (obstacle.position.x <= 0) {
        this.obstacles.delete(obstacle.id);
        this.add(obstacle.position.y, globals.canvas.clientWidth);
      }

      const state = store.getState();

      obstacle.position.x -= state.speed.x;
      obstacle.position.y = (obstacle.position.y - state.speed.y*1.2);
      const obstacleX = globals.canvas.clientWidth - obstacle.position.x;
      const obstacleY = obstacle.position.y;
      draw(obstacle.sprite[obstacle.direction], obstacleX, obstacleY, obstacle.hit);
    })
  }

  update() {
    this.count();
    this.draw();
  }
}
