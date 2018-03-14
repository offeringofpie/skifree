export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = {
        ...state,
        started: action.payload
      };
      break;
    case 'PLAYER_MOVE':
      let speedX = Math.min(Math.max(state.x - action.payload, -5), 5);
      let speedY = Math.min(Math.max(5 - Math.abs(speedX), 0), 5);
      if (action.payload == 5) {
        speedX = 0;
        speedY = 5;
      } else if (speedY == 2) {
        speedY = 0;
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
