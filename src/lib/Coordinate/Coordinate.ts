export type CoordinateValue = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default class Coordinate {
	public x: number;
	public y: number;
	public isHidden = true;
	public flagged = false;
	public value: CoordinateValue;
	// -2 for unset, -1 for mine, 0 for empty, 1+ for number value

	constructor(x: number, y: number, value: CoordinateValue) {
		this.x = x;
		this.y = y;
		this.value = value;
	}

	public setValue(value: CoordinateValue) {
		this.value = value;
		return value;
	}

	public flag() {
		// true if flagged
		// false if un-flagged
		// 0 if no effect
		if (this.isHidden) {
			this.flagged = !this.flagged;
			return this.flagged;
		}
		return 0;
	}

	public reveal() {
		if (!this.flagged) {
			this.isHidden = false;
		}
	}

	public toString(): string {
		return `${this.flagged ? "F" : this.isHidden ? "H" : "S"}[(${this.x},${
			this.y
		})@${this.value < 0 ? this.value : "+" + this.value}]`;
	}

	public toShortString(): string {
		let out = this.value.toString();
		if (this.value === -2) {
			out = "?";
		}
		if (this.value === -1) {
			out = "x";
		}
		if (this.value === 0) {
			out = " ";
		}
		return out;
	}

	public ID(): string {
		return `${this.x},${this.y}`;
	}

	public static neighborsOf(
		x: number,
		y: number,
		margin: number
	): Coordinate[] {
		const c = new Coordinate(x, y, -2);
		return c.getNeighbors(margin);
	}

	public getNeighbors(margin: number): Array<Coordinate> {
		return Coordinate.validNeighborsIn(
			[
				new Coordinate(this.x - 1, this.y - 1, -2),
				new Coordinate(this.x, this.y - 1, -2),
				new Coordinate(this.x + 1, this.y - 1, -2),
				new Coordinate(this.x - 1, this.y, -2),
				new Coordinate(this.x + 1, this.y, -2),
				new Coordinate(this.x - 1, this.y + 1, -2),
				new Coordinate(this.x, this.y + 1, -2),
				new Coordinate(this.x + 1, this.y + 1, -2)
			],
			margin
		);
	}

	public getDiamondNeighbors(margin: number): Array<Coordinate> {
		return Coordinate.validNeighborsIn(
			[
				new Coordinate(this.x - 2, this.y, -2),
				new Coordinate(this.x - 1, this.y - 1, -2),
				new Coordinate(this.x - 1, this.y, -2),
				new Coordinate(this.x - 1, this.y + 1, -2),
				new Coordinate(this.x, this.y - 2, -2),
				new Coordinate(this.x, this.y - 1, -2),
				new Coordinate(this.x, this.y + 1, -2),
				new Coordinate(this.x, this.y + 2, -2),
				new Coordinate(this.x + 1, this.y - 1, -2),
				new Coordinate(this.x + 1, this.y, -2),
				new Coordinate(this.x + 1, this.y + 1, -2),
				new Coordinate(this.x + 2, this.y, -2)
			],
			margin
		);
	}

	public getQuadNeighbors(margin: number): Array<Coordinate> {
		return Coordinate.validNeighborsIn(
			[
				new Coordinate(this.x + 1, this.y, -2),
				new Coordinate(this.x - 1, this.y, -2),
				new Coordinate(this.x, this.y + 1, -2),
				new Coordinate(this.x, this.y - 1, -2)
			],
			margin
		);
	}

	private static validNeighborsIn(tests: Array<Coordinate>, margin: number) {
		const out = new Array<Coordinate>();
		tests.forEach((x) => {
			if (x.withinLimitsOfBoard(margin)) out.push(x);
		});
		return out;
	}

	public withinLimitsOfBoard(margin: number) {
		return !(this.x < 0 || this.x >= margin || this.y < 0 || this.y >= margin);
	}

	public isMine() {
		return this.value === -1;
	}

	public isEmpty() {
		return this.value === 0;
	}

	public static randomMine(limit: number): Coordinate {
		return new Coordinate(
			Math.floor(Math.random() * (limit - 1)),
			Math.floor(Math.random() * (limit - 1)),
			-1
		);
	}
}
