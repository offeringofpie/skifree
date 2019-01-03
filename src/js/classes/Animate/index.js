export default class Animate {
  constructor(framerate = 1000 / 120) {
    this.frame = 0;
    this.lastTime = 0;
    this.framerate = framerate;

    this.loop = time => {
      this.frame += Math.round((time - this.lastTime)/framerate);

      this.lastTime = time;
      this.update(framerate);

      this.start();
    };
  }

  stop() {
    cancelAnimationFrame(this.loop);
  }

  start() {
    requestAnimationFrame(this.loop);
  }
}