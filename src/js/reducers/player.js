export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {...state, direction: 5};
      break;
    case 'GAME_OVER':
      state = {...state, ended: action.payload};
      break;
    case 'UPDATE_SCORE':
      let score = action.payload ? state.score + action.payload : action.payload;
      state = {...state, score: score};
      break;
    case 'PLAYER_MOVE':
      let direction = state.direction + action.payload;
      if (action.payload == 5){
        direction = action.payload;
      } else if (direction < 0) {
        direction = 2;
      } else if (direction > 10) {
        direction = 8;
      }
      state = {...state, direction: direction};
      break;
    case 'PLAYER_MOUSEMOVE':
      let mDirection = 5;

      switch (true) {
        case (action.payload.x == 3): mDirection = 3; break;
        case (action.payload.x == 2): mDirection = 4; break;
        case (action.payload.x == -2): mDirection = 6; break;
        case (action.payload.x == -3): mDirection = 7; break;
        default: mDirection = 5;
      }

      if (action.payload.y == 0) {
        if (action.payload.x == 0) {
          mDirection = 5;
        } else {
          mDirection = (action.payload.x > 0) ? 2 : 8;
        }
      }

      state = {...state, direction: mDirection};
      break;
    case 'PLAYER_HIT':
      state = {
        ...state,
        hit: action.payload,
        direction: 14
      };
      break;
  }

  return state;
}
