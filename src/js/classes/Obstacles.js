import {store} from '../globals';
import draw from '../functions/draw';

import Tree from '../entities/Tree';

export default class Obstacles {
  constructor() {
    this.globals = store.getState();
    this.obstacles = [];
    this.tree = new Tree();
  }

  init() {
    for (let o = 0; o<10; o++) {
      this.add();
    }
  }

  fetchGlobals() {
    this.globals = store.getState();
  }

  add(y = 0) {
    this.obstacles.push(new Tree(y));
  }

  draw() {
    this.obstacles.forEach((obstacle,i) => {
      if (i == 0) {
        if (obstacle.position.y >= 0) {
        } else {
          this.obstacles.splice(i, 1);
          this.add(this.globals.canvas.height);
        }
      }
      obstacle.position.y -= this.globals.player.speed;
      const obstacleX = this.globals.canvas.width - obstacle.position.x;
      const obstacleY = obstacle.position.y;
      draw(obstacle.sprite[0],obstacleX,obstacleY);
    })
  }

  update() {
    // this.fetchGlobals();
    this.draw();
  }
}
