import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'snow',
    x: 831,
    y: 368,
    width: 63,
    height: 16
  }, {
    name: 'snowMedium',
    x: 901,
    y: 353,
    width: 96,
    height: 32
  }, {
    name: 'snowBig',
    x: 1002,
    y: 260,
    width: 253,
    height: 124
  }
];

export default class SnowSmall extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = Math.floor(Math.random()*this.sprite.length);
  }
}
