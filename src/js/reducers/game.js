export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {
        ...state,
        started: 1,
        over: 0
      };
      break;
    case 'UPDATE_DISTANCE':
      state = {
        ...state,
        distance: action.payload
      }
      break;
    case 'UPDATE_ELAPSED':
      state = {
        ...state,
        elapsed: action.payload
      }
      break;
    case 'PLAYER_HIT':
      state = {...state,
        over: action.payload
      };
      break;
  }

  return state;
}
