import {store} from '../globals';
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
    this.scale = 48;
    this.fullWidth = window.innerWidth;
    this.fullHeight = window.innerHeight;
    this.player = new Player();
    this.animate = new Animate(1 / 60);
    this.obstacles = new Obstacles();
  }

  init() {
    this.resizeCanvas();
    Observable.fromEvent(window, 'resize').subscribe(e => {
      this.resizeCanvas();
    });

    this.player.position.x = this.globals.canvas.width / 2;

    this.animate.update = (deltaTime) => {
      this.fillArea();
      this.player.update(deltaTime);
      this.obstacles.update(deltaTime);
      this.hitTest();
    };

    this.animate.start();
    this.obstacles.init();
    this.hitTest();
    input();
  }

  hitTest() {
    const playerBounds = [
      {
        x: this.player.position.x - this.player.sprite[this.player.direction].width,
        y: this.player.position.y - this.player.sprite[this.player.direction].height
      }, {
        x: this.player.position.x,
        y: this.player.position.y
      }
    ];
    this.obstacles.obstacles.forEach(obstacle => {
      if ((playerBounds[0].x <= obstacle.position.x && playerBounds[1].x >= obstacle.position.x) || (playerBounds[1].x >= obstacle.position.x && playerBounds[0].x <= obstacle.position.x - obstacle.sprite[0].width)) {
        if (playerBounds[1].y >= obstacle.position.y && (playerBounds[0].y <= obstacle.position.y - obstacle.sprite[0].height)) {
          store.dispatch({type: 'PLAYER_HIT', payload: 1});
        }
      }
    });
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.globals.canvas.width = width;
    this.globals.canvas.height = height;
    this.player.update();
    this.obstacles.update();
    this.debug();
  }

  fillArea(color = 'rgba(255,255,255,1)', x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    this.globals.context.fillStyle = color;
    this.globals.context.fillRect(x, y, width, height);
  }

  debug() {
    let w = this.globals.canvas.width - this.fullWidth;
    let h = -this.scale;
    while (w < this.fullWidth) {
      let color = Math.min(Math.abs(w), 255);
      this.fillArea('rgba(255,0,0,.1)', w, 0, 1, this.globals.canvas.height);
      w += this.scale;
    }
    while (h < this.fullHeight) {
      this.fillArea('rgba(100,0,0,.1)', 0, h, this.globals.canvas.width, 1);
      h += this.scale;
    }
  }
}
