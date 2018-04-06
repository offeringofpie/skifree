import {globals, store} from '../globals';

const keys = {
  ArrowRight: (ev) => {
    if (store.getState().game.started) {
      store.dispatch({type: 'PLAYER_MOVE', payload: 1});
    }
  },
  ArrowLeft: (ev) => {
    if (store.getState().game.started) {
      store.dispatch({type: 'PLAYER_MOVE', payload: -1});
    }
  },
  ArrowDown: (ev) => {
    if (!store.getState().game.started) {
      store.dispatch({type: 'GAME_START', payload: 1});
    }
    store.dispatch({type: 'PLAYER_MOVE', payload: 5});
  },
  KeyF: (ev) => {
    const ratio = (store.getState().speed.ratio === 16) ? 8 : 16;
    store.dispatch({type: 'PLAYER_SET_RATIO', payload: ratio});
  },
  Space: (ev) => {
    store.dispatch({type: 'PLAYER_JUMP', payload: {jumping:1,strength:25}});
    if (store.getState().game.over) {
      store.dispatch({type: 'PLAYER_HIT', payload: 0});
      store.dispatch({type: 'GAME_START', payload: 1});
    }
  }
}

export default function(game) {
  window.addEventListener('keydown', ev => {
    const code = ev.code;
    if (keys.hasOwnProperty(code) && !store.getState().game.over) {
      keys[code]();
    }
  });

  window.addEventListener('mousemove', ev => {
    let speed = {
      x: 0,
      y: 0,
      ratio: store.getState().speed.ratio
    }

    speed.x = -Math.sin(((ev.clientX - globals.canvas.width / 2) / globals.canvas.width * 100) * Math.PI / 180) * speed.ratio;
    speed.y = Math.floor(Math.abs(Math.cos(speed.x / 4) * speed.ratio));

    switch (true) {
      case(ev.clientY <= 100 && ev.clientY >= 0):
        speed.ratio = 0;
        speed.y = 0;
        break;
      case(ev.clientY <= globals.canvas.height * 2 / 4 && ev.clientY >= globals.canvas.height / 4):
        speed.ratio = 2;
        break;
      case(ev.clientY <= globals.canvas.height * 3 / 4 && speed.x !== 0):
        speed.ratio = 3;
        break;
      default:
        speed.ratio = 5;
        break;
    }

    if (store.getState().game.started && !store.getState().game.over) {
      store.dispatch({type: 'PLAYER_MOUSEMOVE', payload: speed});
    }
  });

  window.addEventListener('click', ev => {
    if (!ev.button) {
      if (!store.getState().game.started) {
        store.dispatch({type: 'GAME_START', payload: 1});
      } else {
        store.dispatch({type: 'PLAYER_JUMP', payload: {jumping:1,strength:25}});
        if (store.getState().game.over) {
          store.dispatch({type: 'PLAYER_HIT', payload: 0});
          store.dispatch({type: 'GAME_START', payload: 1});
        }
      }
    }
  });
}
