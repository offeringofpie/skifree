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
      let speedX = Math.min(Math.max(state.x - action.payload, -state.ratio), state.ratio);
      let speedY = Math.min(Math.max(state.ratio - Math.abs(speedX), 0), state.ratio);
      if (action.payload == 5) {
        speedX = 0;
        speedY = state.ratio;
      } else if (speedY == 2) {
        speedY = 0;
      }

      state = {
        ...state,
        x: speedX,
        y: speedY
      };
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
