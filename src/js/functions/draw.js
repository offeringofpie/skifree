import { globals, store } from '../globals';

/**
 * [draw command]
 * @param  {Object} sprite Sprite object
 * @param  {Number} canvasX target x position in canvas
 * @param  {Number} canvasY target y position in canvas
 * @param  {String} type type of draw in canvas
 */
export default function draw(
  sprite = {
    x: 0,
    y: 0,
    width: 60,
    height: 128,
    flipped: 0
  },
  canvasX = 0,
  canvasY = 0,
  hit = 0,
  type = 'image'
) {
  if (type === 'image') {
    globals.context.drawImage(
      globals.sprite,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      canvasX - sprite.width / 2,
      canvasY - sprite.height / 2,
      sprite.width / 3,
      sprite.height / 3
    );
  } else {
    globals.context.font = '12px serif';
    globals.context.fillStyle = 'black';
    globals.context.fillText(sprite, canvasX, canvasY);
  }

  if (globals.debug) {
    globals.context.strokeStyle = hit ? 'red' : 'green';
    globals.context.strokeRect(
      canvasX - sprite.width / 2,
      canvasY - sprite.height / 2,
      sprite.width / 3,
      sprite.height / 3
    );
    globals.context.strokeStyle = 'rgba(20,20,20,0.1)';
    globals.context.beginPath();
    globals.context.moveTo(globals.canvas.width/2 + store.getState().game.center, 0);
    globals.context.lineTo(globals.canvas.width/2 + store.getState().game.center, globals.canvas.height);
    globals.context.stroke(); 
  }
}
