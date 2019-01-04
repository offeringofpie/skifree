import {globals, store} from '../globals';

export default function hitTest(player, obstacle, state) {
  const playerBounds = [
    {
      x: player.position.x - player.sprite[player.direction].width / 2,
      y: player.position.y - player.sprite[player.direction].height / 2 + player.sprite[player.direction].height / 3
    }, {
      x: player.position.x - player.sprite[player.direction].width / 2 + player.sprite[player.direction].width / 3,
      y: player.position.y - player.sprite[player.direction].height / 2 + player.sprite[player.direction].height / 3
    }
  ];

  const obstaclePos = [
    {
      x: globals.canvas.clientWidth - obstacle.position.x - obstacle.sprite[obstacle.direction].width / 2,
      y: obstacle.position.y - obstacle.sprite[obstacle.direction].height / 2 + obstacle.sprite[obstacle.direction].height / 3
    }, {
      x: globals.canvas.clientWidth - obstacle.position.x - obstacle.sprite[obstacle.direction].width / 2 + obstacle.sprite[obstacle.direction].width / 3,
      y: obstacle.position.y - obstacle.sprite[obstacle.direction].height / 2 + obstacle.sprite[obstacle.direction].height / 3
    }
  ];

  if ((playerBounds[0].x <= obstaclePos[0].x && playerBounds[1].x >= obstaclePos[0].x) || (playerBounds[1].x >= obstaclePos[0].x && playerBounds[0].x <= obstaclePos[1].x)) {
    if (playerBounds[0].y >= obstaclePos[0].y - 5 && playerBounds[0].y <= obstaclePos[0].y + 5) {
      if (player.jumping) {
        store.dispatch({type: 'UPDATE_SCORE', payload: 0.1 *state.speed.ratio});
      } else if (obstacle.sprite[0].name.match(/snow+?/)) {
        const strength = (obstacle.sprite[0].name == "snowBig") ? 15 : 25;
        store.dispatch({
          type: 'PLAYER_JUMP',
          payload: {
            jumping: 1,
            strength: strength
          }
        });
      } else if (obstacle.sprite[0].name.match(/ramp/)) {
        store.dispatch({
          type: 'PLAYER_JUMP',
          payload: {
            jumping: 1,
            strength: 100
          }
        });
      } else if (player.position.y == 200) {
        if (!player.hit) {
          store.dispatch({type: 'UPDATE_SCORE', payload: -10});
          store.dispatch({type: 'PLAYER_HIT', payload: 1});
        }
      }
    }
  }
}
