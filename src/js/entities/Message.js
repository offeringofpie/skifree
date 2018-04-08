import {store} from '../globals';

export default class Message {
  constructor(x= 0, y = 0, text = "") {
    this.moving = false;
    this.speed = 0;
    this.sprite = [text];
    this.text = text;
    this.direction = 0;
    this.position = {
      x: x,
      y: y // setting default position below the player sprite
    };
    this.hit = 0;
  }
}
