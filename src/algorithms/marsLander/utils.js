export const sleep = (millis) => new Promise((resolve) => setTimeout(() => resolve(), millis));

export const randInt = (min, max) => {
  let diff = 0;
  for (let i = min; i <= max; i++) diff += 1
  const r = Math.floor(Math.random() * diff);
  return min + r;
}

export const randomGaussian = () => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export const toRadians = (degrees) => degrees * Math.PI / 180;
export const toDegrees = (radians) => radians * 180 / Math.PI;
export const pow = (x, a) => x ** a;
export const hypot = (dx, dy) => Math.sqrt(pow(dx, 2) + pow(dy, 2));

export class Position {
  x;
  y;

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export class Line {
  a;
  b;

  constructor(p1, p2) {
    this.a = p1;
    this.b = p2;
  }

  linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Calculate the slopes of the lines
    const m1 = (y2 - y1) / (x2 - x1);
    const m2 = (y4 - y3) / (x4 - x3);

    // Calculate the y-intercepts of the lines
    const b1 = y1 - m1 * x1;
    const b2 = y3 - m2 * x3;

    // Calculate the intersection point of the lines
    const x = (b2 - b1) / (m1 - m2);
    const y = m1 * x + b1;

    // Check if the intersection point is within the line segments
    if (
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2) &&
      x >= Math.min(x3, x4) &&
      x <= Math.max(x3, x4) &&
      y >= Math.min(y3, y4) &&
      y <= Math.max(y3, y4)
    ) {
      return true;
    } else {
      return false;
    }
  }

  intersects(line) {
    return this.linesIntersect(
      line.a.x, line.a.y, line.b.x, line.b.y,
      this.a.x, this.a.y, this.b.x, this.b.y,
    );
  }
}

export class Gene {
  power = -1
  angle = -1
  duration = -1

  constructor(power, angle, duration) {
    this.power = power
    this.angle = angle
    this.duration = duration
  }

  static random() {
    return new Gene(randInt(0, 4), randInt(-90, 90), randInt(0, 30));
  }

  mutate(probability) {
    if (Math.random() < probability) {
      const power = Math.max(0, Math.min(4, this.power + randInt(-2, 2)));
      const angle = Math.max(-90, Math.min(90, this.power + randInt(-15, 15)));
      const duration = Math.max(0, Math.min(30, this.duration + randInt(-10, 10)));

      return new Gene(power, angle, duration);
    }
    return new Gene(this.power, this.angle, this.duration);
  }
}