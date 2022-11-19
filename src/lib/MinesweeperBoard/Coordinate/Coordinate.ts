export default class Coordinate {
	public x: number;
	public y: number;
	public value: number; // -2 for unset, -1 for mine, 0 for empty, 1+ for number value

	constructor(x: number, y: number, value: number) {
		this.x = x;
		this.y = y;
		this.value = value;
	}

	public setValue(value: number) {
		this.value = value;
		return value;
	}

	public toString(): string {
		return `C[(${this.x},${this.y})@${this.value < 0 ? this.value : "+" + this.value}]`;
	}

	public toShortString(): string {
		if (this.value == -2) {
			return "?";
		}
		if (this.value == -1) {
			return "x";
		}
		if (this.value == 0) {
			return " ";
		}
		return this.value.toString();
	}

	public ID(): string {
		return `${this.x},${this.y}`;
	}

	public static neighborsOf(x: number, y: number, margin: number): Coordinate[] {
		const c = new Coordinate(x, y, -2);
		return c.getNeighbors(margin);
	}

	public getNeighbors(margin: number): Coordinate[] {
		const out = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const x = this.x + i;
				const y = this.y + j;
				const c = new Coordinate(x, y, -2);
				if (c.ID() === this.ID()) {
					continue;
				}
				if (x < 0 || y < 0 || x >= margin || y >= margin) {
					continue;
				}
				out.push(c);
			}
		}
		return out;
	}

	public isMine() {
		return this.value == -1;
	}

	public isEmpty() {
		return this.value == 0;
	}

	public click() {
		console.log("UNIMPLEMENTED");
	}

	public static randomMine(limit: number): Coordinate {
		return new Coordinate(
			Math.floor(Math.random() * (limit - 1)),
			Math.floor(Math.random() * (limit - 1)),
			-1
		);
	}

	public static floodFillFromMatrix(
		origin: Coordinate,
		matrix: Array<Array<Coordinate>>,
		floodSet: Set<Coordinate> = new Set<Coordinate>()
	): Array<Coordinate> {
		// TODO: UNIMPLEMENTED https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/
		return origin.getNeighbors(matrix.length);
	}
}
