import {globals,store} from '../globals';
import draw from '../functions/draw';
import input from '../functions/keymap';
import {Observable, Subject} from "rxjs/Observable";
import Player from '../entities/Player';
import Animate from './Animate';
import Obstacles from './Obstacles';
import 'rxjs/add/observable/fromEvent';

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
    input();
  }

  hitTest() {

    // posX - (sprite.width/2), poxY - (sprite.height/2),
    // sprite.width/3, sprite.height/3
    const playerBounds = [
      {
        x: this.player.position.x - this.player.sprite[this.player.direction].width/2,
        y: this.player.position.y - this.player.sprite[this.player.direction].height/2
      }, {
        x: this.player.position.x - this.player.sprite[this.player.direction].width/2 + this.player.sprite[this.player.direction].width/3,
        y: this.player.position.y - this.player.sprite[this.player.direction].height/2 + this.player.sprite[this.player.direction].height/3
      }
    ];
    this.obstacles.obstacles.forEach(obstacle => {
      let obstaclePos = [
        {
          x: globals.canvas.width - obstacle.position.x - obstacle.sprite[0].width/2,
          y: obstacle.position.y - obstacle.sprite[0].height/2
        }, {
          x: globals.canvas.width - obstacle.position.x - obstacle.sprite[0].width/2 + obstacle.sprite[0].width/3,
          y: obstacle.position.y - obstacle.sprite[0].height/2 + obstacle.sprite[0].height/3,
        }
      ];
      if ((playerBounds[0].x <= obstaclePos[0].x && playerBounds[1].x >= obstaclePos[0].x) || (playerBounds[1].x >= obstaclePos[0].x && playerBounds[0].x <= obstaclePos[1].x)) {
        if (playerBounds[0].y <= obstaclePos[0].y && (playerBounds[1].y >= obstaclePos[0].y) || (playerBounds[1].y >= obstaclePos[0].y && playerBounds[0].y <= obstaclePos[1].y)) {
          store.dispatch({type: 'PLAYER_HIT', payload: 1});
        }
      }
    });
  }

  resizeCanvas(width = window.innerWidth, height = window.innerHeight) {
    globals.canvas.width = width;
    globals.canvas.height = height;
    this.player.update();
    this.obstacles.update();
    this.debug();
  }

  fillArea(color = 'rgba(255,255,255,1)', x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    globals.context.fillStyle = color;
    globals.context.fillRect(x, y, width, height);
  }

  debug() {
    let w = globals.canvas.width - this.fullWidth;
    let h = -this.scale;
    while (w < this.fullWidth) {
      let color = Math.min(Math.abs(w), 255);
      this.fillArea('rgba(255,0,0,.1)', w, 0, 1, globals.canvas.height);
      w += this.scale;
    }
    while (h < this.fullHeight) {
      this.fillArea('rgba(100,0,0,.1)', 0, h, globals.canvas.width, 1);
      h += this.scale;
    }
  }
}
