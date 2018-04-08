const sprite = [
  {
    name: 'logo',
    x: 0,
    y: 274,
    width: 356,
    height: 110
  }
];

export default class Logo {
  constructor(x= 0, y = 0, direction = 0) {
    this.moving = false;
    this.speed = 0;
    this.sprite = sprite;
    this.direction = direction;
    this.position = {
      x: x,
      y: y
    };
  }
}
