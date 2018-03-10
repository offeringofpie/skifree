import {Subject} from 'rxjs/Subject';
import {combineReducers, createStore} from 'redux';
import playerReducer from './reducers/player';

const sprite = new Image(512,128);
sprite.src = './img/player.png';

let defaultState = {
  debug: 0,
  canvas: document.querySelector('canvas'),
  context: document.querySelector('canvas').getContext('2d'),
  subject: new Subject(),
  sprite: sprite,
  player: {
    speed: 0,
    direction: 5
  }
}

const reducer = combineReducers({
  player: playerReducer
});

let store = createStore(reducer, defaultState);
store.subscribe(() => console.log(store.getState()))

export default store;
