import store from '../globals';

const globals = store.getState();

export default function draw(
  sprite = {
    x: 0, y: 0,
    width: 60, height: 128,
    flipped: 0
  },
  canvasX = 0, canvasY = 0) {

  globals.context.drawImage(
    globals.sprite,
    sprite.x, sprite.y,
    sprite.width, sprite.height,
    canvasX - (sprite.width/2), canvasY - (sprite.height/2),
    sprite.width/3, sprite.height/3
  );

  if (globals.debug) {
    globals.context.strokeStyle = 'green';
    globals.context.strokeRect(
      canvasX - (sprite.width/2),
      canvasY - (sprite.height/2),
      sprite.width/3,
      sprite.height/3
    );
  }
}
