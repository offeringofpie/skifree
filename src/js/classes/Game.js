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
    input(this);
    this.start();
  }

  start() {
    this.player.position.x = globals.canvas.width / 2;

    this.animate.update = (deltaTime) => {
      this.fillArea();
      this.obstacles.update(deltaTime);
      this.player.update(deltaTime);
      this.hitTest();
      this.store = store.getState();

      if (this.store.game.started && !this.store.game.over) {
        store.dispatch({type: 'UPDATE_DISTANCE', payload: this.store.game.distance+this.store.speed.y/10});
      }
    };

    this.animate.start();
    this.obstacles.init();
    this.hitTest();
  }

  restart() {
    this.animate.stop();
    this.obstacles.clear();
    this.player.reset();
    this.fillArea();
    this.start();
    store.dispatch({type: 'GAME_START', payload: 1});
    store.dispatch({type: 'UPDATE_DISTANCE', payload: 0});
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
