import {globals, store} from '../globals';

export default function hitTest(player, obstacle) {
  const playerBounds = [
    {
      x: player.position.x - player.sprite[player.direction].width/2,
      y: player.position.y - player.sprite[player.direction].height/2
    }, {
      x: player.position.x - player.sprite[player.direction].width/2 + player.sprite[player.direction].width/3,
      y: player.position.y - player.sprite[player.direction].height/2 + player.sprite[player.direction].height/3
    }
  ];

  const obstaclePos = [
    {
      x: globals.canvas.width - obstacle.position.x - obstacle.sprite[0].width/2,
      y: obstacle.position.y - obstacle.sprite[0].height/2
    }, {
      x: globals.canvas.width - obstacle.position.x - obstacle.sprite[0].width/2 + obstacle.sprite[0].width/3,
      y: obstacle.position.y - obstacle.sprite[0].height/2 + obstacle.sprite[0].height/3,
    }
  ];


  if ((playerBounds[0].x <= obstaclePos[0].x && playerBounds[1].x >= obstaclePos[0].x) || (playerBounds[1].x >= obstaclePos[0].x && playerBounds[0].x <= obstaclePos[1].x)) {
    if (playerBounds[0].y <= obstaclePos[0].y && (playerBounds[1].y >= obstaclePos[0].y) || (playerBounds[1].y >= obstaclePos[0].y && playerBounds[0].y <= obstaclePos[1].y)) {
      if (obstacle.sprite[0].name != 'ramp' && obstacle.sprite[0].name != 'snow') {
        console.log(obstacle.sprite[0].name);
        store.dispatch({type: 'PLAYER_HIT', payload: 1});
      }
    }
  }
}
