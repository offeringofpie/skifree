export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {
        ...state,
        started: action.payload,
        over: 0
      };
      break;
    case 'GAME_PAUSE':
      state = {
        ...state,
        started: action.payload,
        over: 0
      };
      break;
    case 'GAME_RESET':
      state = {
        ...state,
        reset: action.payload
      };
      break;
    case 'UPDATE_DISTANCE':
      state = {
        ...state,
        distance: action.payload
      };
      break;
    case 'UPDATE_CENTER':
      state = {
        ...state,
        center: action.payload
      };
      break;
    case 'UPDATE_ELAPSED':
      state = {
        ...state,
        elapsed: action.payload
      };
      break;
    case 'UPDATE_SCORE':
      const score = action.payload ? state.score + action.payload : 0;
      state = {
        ...state,
        score: score
      };
      break;
    case 'PLAYER_HIT':
      state = {
        ...state,
        over: action.payload
      };
      break;
    case 'PLAYER_EATEN':
      state = {
        ...state,
        over: action.payload
      };
      break;
    case 'DEBUG_MODE':
      state = {
        ...state,
        debug: action.payload
      };
      break;
    case 'WINDOW_MODE':
      state = {
        ...state,
        windowed: action.payload
      };
      break;
  }

  return state;
}
