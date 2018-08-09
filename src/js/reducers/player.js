export default function(state = {}, action) {
  switch (action.type) {
    case 'GAME_START':
      state = { ...state, direction: 5, hit: 0 };
      break;
    case 'GAME_OVER':
      state = { ...state, ended: action.payload };
      break;
    case 'PLAYER_POSITION':
      state = { ...state, position: action.payload};
      break;
    case 'PLAYER_JUMP':
      const flip =
        typeof action.payload.flip !== 'undefined' ? action.payload.flip : 0;
      state = {
        ...state,
        jumping: action.payload.jumping,
        strength: action.payload.strength,
        flip: flip
      };
      break;
    case 'UPDATE_SCORE':
      let score = action.payload
        ? state.score + action.payload
        : action.payload;
      state = { ...state, score: score };
      break;
    case 'PLAYER_MOVE':
      let direction = state.direction + action.payload;
      if (action.payload == 5) {
        direction = action.payload;
      } else if (direction < 0) {
        direction = 2;
      } else if (action.payload > 0 && state.direction === 1) {
        direction = 3;
      } else if (direction > 10) {
        direction = 8;
      }
      state = { ...state, direction: direction };
      break;
    case 'PLAYER_MOUSEMOVE':
      if (!state.jumping) {
        let mDirection = 5;

        if (action.payload.x >= 0.6) {
          mDirection = 4;
          if (action.payload.x >= 2) {
            mDirection = 3;
          }
        } else if (action.payload.x <= -0.6) {
          mDirection = 6;
          if (action.payload.x <= -2) {
            mDirection = 7;
          }
        }

        if (action.payload.y == 0) {
          if (action.payload.x == 0) {
            mDirection = 5;
          } else {
            mDirection = action.payload.x > 0 ? 2 : 8;
          }
        }
        state = { ...state, direction: mDirection };
      }

      break;
    case 'PLAYER_HIT':
      if (action.payload) {
        state = {
          ...state,
          hit: action.payload,
          direction: state.direction === 15 ? 15 : 14
        };
      }
      break;
    case 'PLAYER_SPRITE':
      state = {
        ...state,
        direction: action.payload
      };
      break;
  }

  return state;
}
