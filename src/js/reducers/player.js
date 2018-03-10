export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {...state, started: action.payload};
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
    case 'UPDATE_SPEED':
      let speed = action.payload ? state.speed + action.payload : action.payload;
      state = {...state, speed: speed};
      break;
  }

  return state;
}
