import {globals, store} from '../globals';


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

export default function(game) {
  window.addEventListener('keydown', ev => {
    const code = ev.code;
    if (keys.hasOwnProperty(code) && store.getState().game.started && !store.getState().game.over) {
        keys[code]();
      }
    }
  );

  window.addEventListener('mousemove', ev => {
    let speed = {
      x: 0,
      y: 0,
      ratio: 5
    }

    switch(true) {
      case (ev.clientX >= globals.canvas.width/2-100 && ev.clientX <= globals.canvas.width/2+100 ): speed.x = 0; speed.x = 0; break;
      case (ev.clientX <= globals.canvas.width/4): speed.x = 3; break;
      case (ev.clientX < globals.canvas.width/2): speed.x = 2; break;
      case (ev.clientX >= globals.canvas.width*3/4): speed.x = -3; break;
      case (ev.clientX >= globals.canvas.width/2): speed.x = -2; break;
      default: speed.x = 0; break;
    }

    speed.x = -Math.sin(((ev.clientX-globals.canvas.width/2)/globals.canvas.width*100)*Math.PI/180)*speed.ratio;
    speed.y = Math.floor(Math.abs(Math.cos(speed.x/4)*speed.ratio));

    switch(true) {
      case (ev.clientY <= 100 && ev.clientY >= 0): speed.ratio = 0;speed.y = 0; break;
      case (ev.clientY <= globals.canvas.height*2/4 && ev.clientY >= globals.canvas.height/4): speed.ratio = 2; break;
      case (ev.clientY <= globals.canvas.height*3/4 && speed.x !== 0): speed.ratio = 3; break;
      default: speed.ratio = 5; break;
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
        if (store.getState().game.over) {
          game.restart();
        }
      }
    }
  });
}
