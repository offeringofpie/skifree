import { globals, store } from '../../globals';
import draw from '../../functions/draw';

import Flag from '../../entities/Flag';
import Logo from '../../entities/Logo';
import Message from '../../entities/Message';

export default class objects {
  constructor() {
    this.objects = [];
  }

  init() {
    this.objects.push(new Flag(globals.canvas.width / 2 - 75, 200, 1));
    this.objects.push(new Flag(globals.canvas.width / 2 + 75, 200, 0));
    this.objects.push(new Logo(globals.canvas.width - 455, 150));
    this.objects.push(new Message(globals.canvas.width - 100, 126, 'Skifree v0.1'));
    this.objects.push(new Message(globals.canvas.width - 100, 138, 'Original author: Chris Pirih'));
  }

  add(y = 0) {
    const luckyNumber = Math.random();
  }

  clear() {
    this.objects = [];
  }

  draw() {
    this.objects.forEach((object, i) => {
      if (object.position.y <= -100) {
        this.objects.splice(i, 1);
        this.add();
      }

      const state = store.getState();

      object.position.x -= state.speed.x;
      object.position.y = (object.position.y - state.speed.y/2);
      const objectX = globals.canvas.width - object.position.x;
      const objectY = object.position.y;
      const drawType = typeof object.text === 'undefined' ? 'image' : 'text';
      draw(object.sprite[object.direction], objectX, objectY, drawType);
    });
  }

  update() {
    this.draw();
  }
}
