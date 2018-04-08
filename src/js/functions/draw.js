import {globals, store} from '../globals';

export default function draw(
  sprite = {
    x: 0, y: 0,
    width: 60, height: 128,
    flipped: 0
  },
  canvasX = 0, canvasY = 0,
  type = "image") {

  if (type === "image") {
    globals.context.drawImage(
      globals.sprite,
      sprite.x, sprite.y,
      sprite.width, sprite.height,
      canvasX - (sprite.width/2), canvasY - (sprite.height/2),
      sprite.width/3, sprite.height/3
    );
  } else {
    globals.context.font = '12px serif';
    globals.context.fillStyle = "black";
    globals.context.fillText(sprite, canvasX, canvasY);
  }

  if (globals.debug) {
    globals.context.strokeStyle = sprite.hit ? 'red':'green';
    globals.context.strokeRect(
      canvasX - (sprite.width/2),
      canvasY - (sprite.height/2),
      sprite.width/3,
      sprite.height/3
    );
  }
}
