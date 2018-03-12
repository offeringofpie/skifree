export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {
        ...state,
        started: action.payload
      };
      break;
    case 'PLAYER_MOVE':
      let speedX = state.x - action.payload;
      let speedY = Math.min((state.y + action.payload), 5);
      if (action.payload == 5) {
        speedX = 0;
        speedY = 5;
      } else if (state.x > 8) {
        // speedY = 0;
      }

      state = {
        ...state,
        x: speedX,
        y: speedY
      };
      break;
  }

  return state;
}
