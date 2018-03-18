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

export default function() {
  window.addEventListener('keydown', ev => {
    const code = ev.code;
    if (keys.hasOwnProperty(code)) {
      keys[code]();
    }
  });

  window.addEventListener('mousemove', ev => {
    let speed = {
      x: 0,
      y: 5
    }
    switch(true) {
      case (ev.clientX >= globals.canvas.width/2-100 && ev.clientX <= globals.canvas.width/2+100 ): speed.x = 0; break;
      case (ev.clientX <= globals.canvas.width/4): speed.x = 3; break;
      case (ev.clientX < globals.canvas.width/2): speed.x = 2; break;
      case (ev.clientX >= globals.canvas.width*3/4): speed.x = -3; break;
      case (ev.clientX >= globals.canvas.width/2): speed.x = -2; break;
      default: speed.x = 0; break;
    }

    switch(true) {
      case (ev.clientY <= 100 && ev.clientY >= 0 && speed.x !== 0): speed.y = 0; break;
      case (ev.clientY <= globals.canvas.height*3/4 && speed.x !== 0): speed.y = 4; break;
      default: speed.y = 5;
    }
    store.dispatch({type: 'PLAYER_MOUSEMOVE', payload: speed});
  });
}
