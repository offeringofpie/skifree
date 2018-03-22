export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {
        ...state,
        started: 1,
        over: 0
      };
      break;
    case 'PLAYER_HIT':
      state = {...state,
        over: action.payload
      };
      break;
  }

  return state;
}
