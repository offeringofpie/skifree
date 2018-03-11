import {store} from '../globals';


const keys = {
  ArrowRight: (ev) => {
    store.dispatch({type: 'PLAYER_MOVE', payload: 1});
  },
  ArrowLeft: (ev) => {
    store.dispatch({type: 'PLAYER_MOVE', payload: -1});
  },
  ArrowDown: (ev) => {
    store.dispatch({type: 'PLAYER_MOVE', payload: 5});
  }
}

export default function() {
  window.addEventListener('keydown', event => {
    const code = event.code;
    if (keys.hasOwnProperty(code)) {
      keys[code]();
    }
  });
}
