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
    this.objects.push(new Flag(-75, 200, 1));
    this.objects.push(new Flag(75, 200, 0));
    this.objects.push(new Logo(0, 150));
    this.objects.push(new Message(350, 126, 'Skifree v0.1'));
    this.objects.push(new Message(350, 138, 'Original author: Chris Pirih'));
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
      object.position.y = (object.position.y - state.speed.y*1.2);
      const objectX = globals.canvas.clientWidth/2 - object.position.x;
      const objectY = object.position.y;
      const drawType = typeof object.text === 'undefined' ? 'image' : 'text';
      draw(object.sprite[object.direction], objectX, objectY, 0, drawType);
    });
  }

  update() {
    this.draw();
  }
}
