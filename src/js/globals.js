import {Subject} from 'rxjs/Subject';
import {combineReducers, createStore} from 'redux';
import playerReducer from './reducers/player';
import speedReducer from './reducers/speed';
import gameReducer from './reducers/game';

const sprite = new Image(512,156);
sprite.src = './img/player.png';

let globals = {
  debug: 0,
  canvas: document.querySelector('canvas'),
  context: document.querySelector('canvas').getContext('2d'),
  subject: new Subject(),
  sprite: sprite,
  game: {
    started: 0,
    elapsed: 0,
    over: 0,
    distance: 0,
    speed: 0
  },
  player: {
    direction: 5,
    hit: 0,
    jump: 0
  },
  speed: {
    x: 0,
    y: 0,
    ratio: 8
  }
}

const reducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  speed: speedReducer
});

let store = createStore(reducer, globals);
store.subscribe(() => {
  // console.log(store.getState())
});

export {globals, store};
