import { Subject } from 'rxjs/Subject';
import { combineReducers, createStore } from 'redux';
import playerReducer from './reducers/player';
import speedReducer from './reducers/speed';
import gameReducer from './reducers/game';

const sprite = new Image(512, 156);
const spriteSrc = require('../img/player.png');
sprite.src = spriteSrc;

let globals = {
  debug: 0,
  canvas: '',
  context: '',
  subject: new Subject(),
  deltaTime: 1 / 60,
  sprite: sprite,
  game: {
    started: 0,
    elapsed: 0,
    over: 0,
    distance: 0,
    center: 0,
    speed: 0,
    score: 0
  },
  player: {
    direction: 5,
    hit: 0,
    jump: 0,
    flip: 0
  },
  speed: {
    x: 0,
    y: 0,
    ratio: 8
  }
};

const reducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  speed: speedReducer
});

let store = createStore(reducer, globals);
store.subscribe(() => {
  // console.log(store.getState())
});

export { globals, store };
