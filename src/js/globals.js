import {Subject} from 'rxjs/Subject';
import {combineReducers, createStore} from 'redux';
import playerReducer from './reducers/player';
import speedReducer from './reducers/speed';

const sprite = new Image(512,128);
sprite.src = './img/player.png';

let globals = {
  debug: 1,
  canvas: document.querySelector('canvas'),
  context: document.querySelector('canvas').getContext('2d'),
  subject: new Subject(),
  sprite: sprite,
  player: {
    direction: 5
  },
  speed: {
    x: 0,
    y: 5
  }
}

const reducer = combineReducers({
  player: playerReducer,
  speed: speedReducer
});

let store = createStore(reducer, globals);
store.subscribe(() => {
  // console.log(store.getState())
});

export {globals, store};
