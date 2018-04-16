import { globals } from '../globals';

export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {...state,
        x: 0,
        y: 8,
        ratio: 8
      };
      break;
      case 'GAME_PAUSE':
        state = {...state,
          x: 0,
          y: 8,
          ratio: 8*action.payload
        };
        break;
    case 'PLAYER_MOVE':
      let speedX = state.x - action.payload*4/3;
      let speedY = state.ratio - Math.abs(speedX*6/3);
      if (action.payload == 5) {
        speedX = 0;
        speedY = state.ratio;
      }

      state = {
        ...state,
        x: Math.min(Math.max(speedX, -state.ratio/2), state.ratio/2),
        y: Math.min(Math.max(speedY, 0), state.ratio)
      };
      console.log(state);
      break;
    case 'PLAYER_MOUSEMOVE':
      let mSpeedX = action.payload.x;
      let mSpeedY = action.payload.y;
      state = {
        ...state,
        x: mSpeedX,
        y: mSpeedY
      };
      break;
    case 'PLAYER_HIT':
      if (action.payload) {
        state = {...state,
          x: 0,
          y: 0
        };
      }
      break;
    case 'PLAYER_SET_RATIO':
      state = {...state,
        y: action.payload,
        ratio: action.payload
      };
      break;
  }

  return state;
}
