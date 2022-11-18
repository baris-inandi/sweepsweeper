export default class Coordinate {
	public x: number;
	public y: number;
	public value: number; // -2 for unset, -1 for mine, 0 for empty, 1+ for number value

	constructor(x: number, y: number, value: number) {
		this.x = x;
		this.y = y;
		this.value = value;
	}

	public toString(): string {
		return `C[(${this.x},${this.y})@${this.value < 0 ? this.value : "+" + this.value}]`;
	}

	public static neighborsOf(x: number, y: number): Coordinate[] {
		const c = new Coordinate(x, y, -2);
		return c.getNeighbors();
	}

	public getNeighbors(): Coordinate[] {
		const out = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const x = this.x + i;
				const y = this.y + j;
				const c = new Coordinate(x, y, -2);
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

	public static randomMine(limit: number): Coordinate {
		return new Coordinate(
			Math.floor(Math.random() * (limit - 1)),
			Math.floor(Math.random() * (limit - 1)),
			-1
		);
	}
}
