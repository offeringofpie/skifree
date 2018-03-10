import store from '../globals';
import draw from '../functions/draw';

import Tree from '../entities/Tree';

export default class Obstacles {
  constructor(canvas) {
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

  add() {
    this.obstacles.push(new Tree());
  }

  draw() {
    this.obstacles.forEach(obstacle => {
      let obstacleX = this.globals.canvas.width - obstacle.position.x;
      let obstacleY = this.globals.canvas.height - obstacle.position.y;
      draw(obstacle.sprite[0],obstacleX,obstacleY);
    })
  }

  update() {
    this.fetchGlobals();
    this.draw();
  }
}
