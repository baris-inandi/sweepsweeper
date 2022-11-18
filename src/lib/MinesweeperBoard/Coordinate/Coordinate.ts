export default class Coordinate {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public toString(): string {
		return `(${this.x}, ${this.y})`;
	}

	public static neighborsOf(x: number, y: number): Coordinate[] {
		const c = new Coordinate(x, y);
		return c.getNeighbors();
	}

	public getNeighbors(): Coordinate[] {
		const out = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const x = this.x + i;
				const y = this.y + j;
				const c = new Coordinate(x, y);
				if (c.toString() === this.toString()) {
					continue;
				}
				if (x < 0 || y < 0) {
					continue;
				}
				out.push(c);
			}
		}
		return out;
	}

	public static randomSquareCoordinate(limit: number): Coordinate {
		return new Coordinate(
			Math.floor(Math.random() * (limit - 1)),
			Math.floor(Math.random() * (limit - 1))
		);
	}
}
