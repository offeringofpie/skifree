import store from '../globals';
import draw from '../functions/draw';
import input from '../functions/keymap';
import {Observable, Subject} from "rxjs/Observable";
import Player from '../entities/Player';
import Animate from './Animate';
import Obstacles from './Obstacles';
import 'rxjs/add/observable/fromEvent';

export default class Game {
  constructor() {
    this.globals = store.getState();
    this.canvas = this.globals.canvas;
    this.context = this.globals.canvas.getContext('2d');
    this.scale = 48;
    this.horizontal = this.globals.canvas.width / this.scale;
    this.vertical = this.globals.canvas.height / this.scale;
    this.fullWidth = window.innerWidth;
    this.fullHeight = window.innerHeight;
    this.player = new Player();
    this.animate = new Animate(1/60);
    this.obstacles = new Obstacles(this.canvas);
  }

  init() {
    this.resizeCanvas();
    Observable.fromEvent(window, 'resize').subscribe(e => {
      this.resizeCanvas();
    });

    this.animate.update = (deltaTime) => {
      this.redraw(deltaTime);
    };
    this.animate.start();
    this.obstacles.init();
    input();
    // store.dispatch({type: 'UPDATE_SPEED', payload: 9.5});
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.globals.canvas.width = width;
    this.globals.canvas.height = height;
    this.player.position.x = width/2;
    this.obstacles.update();
    this.debug();
  }

  fillArea(color = 'rgba(255,255,255,1)', x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  redraw(deltaTime) {
    draw(this.player.sprite[store.getState().player.direction],this.player.position.x,this.player.position.y);
    this.obstacles.update();
  }

  debug() {
    let w = this.canvas.width - this.fullWidth;
    let h = -this.scale;
    while (w < this.fullWidth) {
      let color = Math.min(Math.abs(w), 255);
      this.fillArea('rgba(255,0,0,.1)', w, 0, 1, this.canvas.height);
      w += this.scale;
    }
    while (h < this.fullHeight) {
      this.fillArea('rgba(100,0,0,.1)', 0, h, this.canvas.width, 1);
      h += this.scale;
    }
  }
}
