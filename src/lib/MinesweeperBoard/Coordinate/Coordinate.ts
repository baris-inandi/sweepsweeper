export default class Coordinate {
	public x: number;
	public y: number;
	public isHidden = true;
	public value: number; // -2 for unset, -1 for mine, 0 for empty, 1+ for number value
	public flagged = false;

	constructor(x: number, y: number, value: number) {
		this.x = x;
		this.y = y;
		this.value = value;
	}

	public setValue(value: number) {
		this.value = value;
		return value;
	}

	public flag() {
		if (this.isHidden) {
			this.flagged = !this.flagged;
		}
	}

	public show() {
		this.isHidden = false;
	}

	public toString(): string {
		return `${this.isFlagged ? "F" : this.isHidden ? "H" : "S"}[(${this.x},${this.y})@${
			this.value < 0 ? this.value : "+" + this.value
		}]`;
	}

	public toShortString(): string {
		let out = this.value.toString();
		if (this.value == -2) {
			out = "?";
		}
		if (this.value == -1) {
			out = "x";
		}
		if (this.value == 0) {
			out = " ";
		}
		return (this.isHidden ? "H" : " ") + out;
	}

	public ID(): string {
		return `${this.x},${this.y}`;
	}

	public static neighborsOf(x: number, y: number, margin: number): Coordinate[] {
		const c = new Coordinate(x, y, -2);
		return c.getNeighbors(margin);
	}

	public getNeighbors(margin: number): Array<Coordinate> {
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

	public getQuadNeighbors(margin: number): Array<Coordinate> {
		const out = new Array<Coordinate>();
		const tests = [
			new Coordinate(this.x + 1, this.y, -2),
			new Coordinate(this.x - 1, this.y, -2),
			new Coordinate(this.x, this.y + 1, -2),
			new Coordinate(this.x, this.y - 1, -2)
		];
		tests.forEach((x) => {
			if (x.withinLimitsOfBoard(margin)) out.push(x);
		});
		return out;
	}

	public withinLimitsOfBoard(margin: number) {
		return !(this.x < 0 || this.x >= margin || this.y < 0 || this.y >= margin);
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
}
