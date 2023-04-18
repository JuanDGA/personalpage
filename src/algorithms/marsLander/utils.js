export const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1))
}

export const toRadians = (degrees) => degrees * Math.PI / 180

export class Position {
  x = -1;
  y = -1;

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export class Gene {
  power = -1
  angle = -1

  constructor(power, angle) {
    this.power = power
    this.angle = angle
  }

  static random() {
    return new Gene(randInt(-1, 1), randInt(-15, 15));
  }
}