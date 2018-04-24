import Logo from './index';

const empty = new Logo();
const mock = {
  moving: false,
  speed: 0,
  sprite: [
    {
      name: 'logo',
      x: 0,
      y: 274,
      width: 712,
      height: 220
    }
  ],
  direction: 0,
  position: {
    x: 0,
    y: 0
  }
};

describe('Logo', () => {
  describe('logo creation', () => {
    const x = 5;
    const y = 5;
    const direction = 2;
    let LogoParams = new Logo(x, y, direction);

    test('should return true on empty state', () => {
      expect(empty).toEqual(mock);
    });

    test('should accept options', () => {
      expect(LogoParams).not.toEqual(empty);
    });

    test('should accept certain parameters', () => {
      let mockParams = mock;
      mockParams.position.x = x;
      mockParams.position.y = y;
      mockParams.direction = direction;

      expect(LogoParams).toEqual(mockParams);
    });
  });
});
