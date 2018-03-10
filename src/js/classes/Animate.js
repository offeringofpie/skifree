export default class Animate {
  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000;

      if (accumulatedTime > 1) {
        accumulatedTime = 1;
      }

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      this.queue();
    }
  }

  queue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.queue();
  }
}
