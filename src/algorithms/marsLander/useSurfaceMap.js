import { Line, Position } from "@/algorithms/marsLander/utils";

export class SurfaceMap {
  points = [];

  addSurfacePoint(position) {
    this.points.push(position);
  }

  reset() {
    this.points = [];
  }

  getLandingPosition() {
    let foundPosition = new Position(-1, -1);

    for (let i = 0; i < this.points.length - 1; i++) {
      if (foundPosition.x !== -1 && foundPosition.y !== -1) break;
      const pointA = this.points[i];
      const pointB = this.points[i + 1];

      if (pointA.y === pointB.y) {
        foundPosition = new Position((pointA.x + pointB.x) / 2, pointA.y);
      }
    }

    return foundPosition;
  }

  getEdges() {
    const edges = [];

    for (let i = 0; i < this.points.length - 1; i++) {
      edges.push(new Line(this.points[i], this.points[i + 1]));
    }

    edges.push(new Line(this.points[this.points.length - 1], this.points[0]));

    return edges;
  }

  getIntersections(x1, y1, x2, y2) {
    const l1 = new Line(new Position(x1, y1), new Position(x2, y2));
    let intersections = 0;

    for (const edge of this.getEdges()) {
      if (edge.intersects(l1)) intersections += 1;
    }

    return intersections
  }
}