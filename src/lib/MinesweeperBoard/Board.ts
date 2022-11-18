import Coordinate from "./Coordinate/Coordinate";

export default class Board {
	private inner: Array<Array<Coordinate>>;
	private uniqueMemory: Map<string, boolean> = new Map<string, boolean>();
	boardSize: number;

	constructor(boardSize: number) {
		const inner = new Array<Array<Coordinate>>();
		for (let i = 0; i < boardSize; i++) {
			inner[i] = [];
			for (let j = 0; j < boardSize; j++) {
				inner[i][j] = new Coordinate(i, j, 0);
			}
		}
		this.inner = inner;
		this.boardSize = boardSize;
		this.populateWithRandomMines();
	}

	public toString(): string {
		let out = "";
		this.inner.forEach((i) => {
			i.forEach((j) => {
				out += j.toString() + "  ";
			});
			out += "\n";
		});
		return out;
	}

	public populateWithRandomMines() {
		const numMines = Math.ceil(this.boardSize ** 2 / 4.85);
		Array(numMines)
			.fill(undefined)
			.forEach(() => {
				const c = this.generateUniqueRandomMineCoordinate();
				this.inner[c.x][c.y] = c;
			});
		for (let i = 0; i < this.boardSize; i++) {
			for (let j = 0; j < this.boardSize; j++) {
				const neighbors = this.inner[i][j].getNeighbors(this.boardSize);
				console.log("index " + i + j + "has n's:");
				console.log(neighbors);
			}
		}
	}

	private generateUniqueRandomMineCoordinate(): Coordinate {
		const limit = this.boardSize;
		let rand = Coordinate.randomMine(limit);
		let randStr = rand.ID();
		while (this.uniqueMemory.get(randStr)) {
			rand = Coordinate.randomMine(limit);
			randStr = rand.ID();
		}
		this.uniqueMemory.set(randStr, true);
		return rand;
	}
}
