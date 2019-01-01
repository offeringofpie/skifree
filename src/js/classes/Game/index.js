import { Observable, Subject } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { globals, store } from '../../globals';
import draw from '../../functions/draw';
import input from '../../functions/keymap';
import hitTest from '../../functions/hitTest';
import Player from '../../entities/Player';
import Yeti from '../../entities/Yeti';
import Animate from '../Animate';
import Obstacles from '../Obstacles';
import Objects from '../Objects';

export default class Game {
  constructor() {
    this.store = store.getState();
    this.scale = 48;
    this.fullWidth = window.innerWidth;
    this.fullHeight = window.innerHeight;
    this.player = new Player();
    this.yeti = new Yeti();
    this.animate = new Animate(globals.deltaTime);
    this.obstacles = new Obstacles();
    this.objects = new Objects();
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
    store.dispatch({ type: 'UPDATE_ELAPSED', payload: 0 });

    this.animate.update = deltaTime => {
      this.update(deltaTime);

      if (this.store.game.started && !this.store.game.over) {
        store.dispatch({
          type: 'UPDATE_ELAPSED',
          payload: this.store.game.elapsed + 0.015
        });
        store.dispatch({
          type: 'UPDATE_DISTANCE',
          payload: this.store.game.distance + this.store.speed.y / 60
        });
        this.hitTest();
      }

      if (this.store.game.elapsed > 1.999 && this.store.game.elapsed <= 2.1 && !this.yeti.summoned) {
        console.log('yes')
        this.yeti.init();
      }
    };

    this.animate.start();
    this.obstacles.init();
    this.objects.init();
    this.update();
    this.hitTest();
  }

  restart() {
    this.animate.stop();
    this.obstacles.clear();
    this.player.reset();
    this.fillArea();
    this.start();
    store.dispatch({ type: 'GAME_START', payload: 1 });
    store.dispatch({ type: 'UPDATE_ELAPSED', payload: 0 });
    store.dispatch({ type: 'UPDATE_DISTANCE', payload: 0 });
    store.dispatch({ type: 'UPDATE_SCORE', payload: 0 });
  }

  hitTest() {
    this.obstacles.obstacles.forEach(obstacle => {
      hitTest(this.player, obstacle, this.store);
    });
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    globals.canvas.width = width;
    globals.canvas.height = height;
    this.player.update();
    this.obstacles.update();
  }

  fillArea(
    color = 'rgba(255,255,255,1)',
    x = 0,
    y = 0,
    width = window.innerWidth,
    height = window.innerHeight
  ) {
    globals.context.fillStyle = color;
    globals.context.fillRect(x, y, width, height);
  }

  update(deltaTime = globals.deltaTime) {
    this.fillArea();
    if (!this.player.jumping) {this.player.update(deltaTime);}
    this.obstacles.update(deltaTime);
    if (this.player.jumping) {this.player.update(deltaTime);}
    this.objects.update(deltaTime);
    this.store = store.getState();
    if (this.yeti.summoned) {
      this.yeti.update(deltaTime);
    }
  }
}
