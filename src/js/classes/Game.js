import {Observable, Subject} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import {globals,store} from '../globals';
import draw from '../functions/draw';
import input from '../functions/keymap';
import hitTest from '../functions/hitTest';
import Player from '../entities/Player';
import Animate from './Animate';
import Obstacles from './Obstacles';

export default class Game {
  constructor() {
    this.store = store.getState();
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

    this.player.position.x = globals.canvas.width / 2;

    this.animate.update = (deltaTime) => {
      if (this.store.speed.y !== 0) {
        this.fillArea();
        this.player.update(deltaTime);
        this.obstacles.update(deltaTime);
        this.hitTest();
      }
    };

    this.animate.start();
    this.obstacles.init();
    this.hitTest();
    input(this);
  }

  restart() {
    this.animate.stop();
    this.obstacles.clear();
    this.player.reset();
    this.fillArea();
    this.init();
    store.dispatch({type: 'GAME_START', payload: 1});
  }

  hitTest() {
    this.obstacles.obstacles.forEach(obstacle => {
      hitTest(this.player, obstacle);
    });
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    globals.canvas.width = width;
    globals.canvas.height = height;
    this.player.update();
    this.obstacles.update();
  }

  fillArea(color = 'rgba(255,255,255,1)', x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    globals.context.fillStyle = color;
    globals.context.fillRect(x, y, width, height);
  }
}
