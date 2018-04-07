import {globals, store} from '../globals';
import draw from '../functions/draw';

import Flag from '../entities/Flag';

export default class objects {
  constructor() {
    this.objects = [];
  }

  init() {
    this.objects.push(new Flag((globals.canvas.width/2) - 75, 200, 1));
    this.objects.push(new Flag((globals.canvas.width/2) + 75, 200, 0));
  }

  add(y = 0) {
    const luckyNumber = Math.random();
  }

  clear() {
    this.objects = [];
  }

  draw() {
    this.objects.forEach((object,i) => {
      if (object.position.y <= -100) {
        this.objects.splice(i, 1);
        this.add();
      }

      const state = store.getState();

      object.position.x -= state.speed.x;
      object.position.y -= state.speed.y;
      const objectX = globals.canvas.width - object.position.x;
      const objectY = object.position.y;
      draw(object.sprite[object.direction],objectX,objectY);
    })
  }

  update() {
    this.draw();
  }
}
