import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { globals, store } from '../../globals';
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
    this.animate = new Animate();
    this.obstacles = new Obstacles();
    this.objects = new Objects();
    this.windowed = 1;
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
    store.dispatch({
      type: 'UPDATE_ELAPSED',
      payload: 0
    });

    this.continue();

    this.animate.start(globals.deltaTime);
  }

  continue () {

    this.animate.update = deltaTime => {
      this.update();

      if (this.windowed !== this.store.game.windowed) {
        this.resizeCanvas();
        this.windowed = this.store.game.windowed
      }

      if (this.store.game.reset) {
        this.restart();
      } else {
        if (this.store.game.started && !this.store.game.over && !this.store.player.eaten) {
          store.dispatch({
            type: 'UPDATE_ELAPSED',
            payload: this.store.game.elapsed + 0.015
          });
          store.dispatch({
            type: 'UPDATE_DISTANCE',
            payload: this.store.game.distance + this.store.speed.y / 30
          });
          store.dispatch({
            type: 'UPDATE_CENTER',
            payload: this.store.game.center + this.store.speed.x
          });

          if (this.store.game.elapsed > 59.999 && this.store.game.elapsed <= 60.1 && !this.yeti.summoned) {
            this.yeti.init();
          }

          this.hitTest();
        }
      }
    };

    this.obstacles.init();
    this.objects.init();
    this.update();
    this.hitTest();
  }

  restart() {
    store.dispatch({
      type: 'GAME_RESET',
      payload: 0
    });
    store.dispatch({
      type: 'GAME_START',
      payload: 1
    });
    store.dispatch({
      type: 'UPDATE_ELAPSED',
      payload: 0
    });
    store.dispatch({
      type: 'UPDATE_DISTANCE',
      payload: 0
    });
    store.dispatch({
      type: 'UPDATE_SCORE',
      payload: 0
    });

    this.animate.stop();
    this.obstacles.clear();
    this.player.reset();
    this.fillArea();
    this.continue();
  }

  hitTest() {
    this.obstacles.obstacles.forEach(obstacle => {
      hitTest(this.player, obstacle, this.store);
    });
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    globals.canvas.width = (this.store.game.windowed) ? Math.min(width, 800) : width;
    globals.canvas.height = (this.store.game.windowed) ? Math.min(height, 568) : height;
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
    globals.context.clearRect(x, y, width, height);
    globals.context.fillStyle = color;
    globals.context.fillRect(x, y, width, height);
  }

  update(deltaTime = globals.deltaTime) {
    this.fillArea();
    if (this.yeti.summoned) {
      this.yeti.update(deltaTime);
    }
    if (!this.player.jumping) {
      this.player.update(deltaTime);
    }
    this.obstacles.update(deltaTime);
    if (this.player.jumping) {
      this.player.update(deltaTime);
    }
    this.objects.update(deltaTime);
    this.store = store.getState();

  }
}