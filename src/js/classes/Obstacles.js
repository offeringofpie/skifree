import {store} from '../globals';
import draw from '../functions/draw';

import Tree from '../entities/Tree';
import Rock from '../entities/Rock';
import Ramp from '../entities/Ramp';

export default class Obstacles {
  constructor() {
    this.globals = store.getState();
    this.obstacles = [];
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
    const luckyNumber = Math.random();

    if (luckyNumber>0.66) {
      this.obstacles.push(new Tree(y));
    } else if (luckyNumber>0.33) {
      this.obstacles.push(new Rock(y));
    } else {
      this.obstacles.push(new Ramp(y));
    }
  }

  draw() {
    this.obstacles.forEach((obstacle,i) => {
      if (obstacle.position.y <= 0) {
        this.obstacles.splice(i, 1);
        this.add(this.globals.canvas.height);
      } else if (obstacle.position.x <= 0){
        this.obstacles.splice(i, 1);
        this.add(obstacle.position.y,this.globals.canvas.width);
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
