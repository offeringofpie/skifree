import {globals, store} from '../globals';
import draw from '../functions/draw';

import Tree from '../entities/Tree';
import Rock from '../entities/Rock';
import Ramp from '../entities/Ramp';
import SnowSmall from '../entities/SnowSmall';
import SnowMedium from '../entities/SnowMedium';
import SnowBig from '../entities/SnowBig';

export default class Obstacles {
  constructor() {
    this.obstacles = [];
  }

  init() {
    const quantity = (globals.canvas.width > 800) ? 20 : 10;
    for (let o = 0; o<quantity; o++) {
      this.add();
    }
  }

  add(y = 0) {
    const luckyNumber = Math.random();

    if (luckyNumber>0.66) {
      this.obstacles.push(new Tree(y));
    } else if (luckyNumber>0.55) {
      this.obstacles.push(new SnowSmall(y));
    } else if (luckyNumber>0.50) {
      this.obstacles.push(new SnowMedium(y));
    } else if (luckyNumber>0.22) {
      this.obstacles.push(new Rock(y));
    } else if (luckyNumber>0.11) {
      this.obstacles.push(new SnowBig(y));
    } else {
      this.obstacles.push(new Ramp(y));
    }
  }

  clear() {
    this.obstacles = [];
  }

  draw() {
    this.obstacles.forEach((obstacle,i) => {
      if (obstacle.position.y <= -100) {
        this.obstacles.splice(i, 1);
        this.add();
      } else if (obstacle.position.x <= 0){
        this.obstacles.splice(i, 1);
        this.add(obstacle.position.y,globals.canvas.width);
      }


      const state = store.getState();

      obstacle.position.x -= state.speed.x;
      obstacle.position.y -= state.speed.y;
      const obstacleX = globals.canvas.width - obstacle.position.x;
      const obstacleY = obstacle.position.y;
      draw(obstacle.sprite[obstacle.direction],obstacleX,obstacleY);
    })
  }

  update() {
    this.draw();
  }
}
