import Coordinate from "./Coordinate/Coordinate";

export default class MinesweeperBoard {
	private inner: Array<Array<Coordinate>>;
	private uniqueMemory: Map<string, boolean> = new Map<string, boolean>();
	public flagged: Map<string, boolean> = new Map<string, boolean>();
	public uninitialized = true;
	public boardSize: number;
	public mineRatio: number;
	public mines: Array<Coordinate> = [];

	constructor(boardSize: number, minePercentage: number, startPoint: Coordinate | null) {
		this.mineRatio = minePercentage / 100;
		const inner = new Array<Array<Coordinate>>();
		for (let i = 0; i < boardSize; i++) {
			inner[i] = [];
			for (let j = 0; j < boardSize; j++) {
				inner[i][j] = new Coordinate(i, j, 0);
			}
		}
		this.inner = inner;
		this.boardSize = boardSize;
		if (startPoint) {
			this.uninitialized = false;
			this.initialize(startPoint);
		}
	}

	public initialize(startPoint: Coordinate) {
		this.uninitialized = false;
		this.populateWithRandomMines(startPoint);
		this.flood(startPoint, true);
	}

	public toString(): string {
		let out = "";
		let outShort = "\n";
		this.inner.forEach((i) => {
			i.forEach((j) => {
				out += j.toString() + "  ";
				outShort += j.toShortString() + "  ";
			});
			out += "\n";
			outShort += "\n";
		});
		return out + outShort + "\nWith " + this.numMines() + " mines";
	}

	public coordinateAt(x: number, y: number) {
		return this.inner[x][y] ? this.inner[x][y] : new Coordinate(x, y, -2);
	}

	public numMines(): number {
		return Math.ceil(this.boardSize ** 2 * this.mineRatio);
	}

	public populateWithRandomMines(startPoint: Coordinate) {
		startPoint.getNeighbors(this.boardSize).forEach((n) => {
			this.uniqueMemory.set(n.ID(), true);
		});
		this.uniqueMemory.set(startPoint.ID(), true);
		Array(this.numMines())
			.fill(undefined)
			.forEach(() => {
				const c = this.generateUniqueRandomMineCoordinate();
				this.mines.push(c);
				this.inner[c.x][c.y] = c;
			});
		for (let i = 0; i < this.boardSize; i++) {
			for (let j = 0; j < this.boardSize; j++) {
				if (this.inner[i][j].isMine()) {
					continue;
				}
				const neighbors = this.inner[i][j].getNeighbors(this.boardSize);
				neighbors.forEach((n) => {
					n.setValue(this.inner[n.x][n.y].value);
				});
				this.inner[i][j].setValue(
					neighbors.filter((x) => {
						return x.isMine();
					}).length
				);
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

	public flood(origin: Coordinate, initialFlood = true) {
		const applied = new Array<Coordinate>();
		const fill = (c: Coordinate) => {
			const x = c.x;
			const y = c.y;
			if (!this.inner[x][y].isHidden) return;
			if (!this.inner[x][y].isEmpty()) return;
			if (initialFlood && applied.length > this.boardSize ** 2 * 0.25) return;
			this.inner[x][y].reveal();
			applied.push(c);
			this.inner[x][y].getQuadNeighbors(this.boardSize).forEach(fill);
		};
		const initial = this.inner[origin.x][origin.y];
		if (!initial.isHidden) {
			return;
		}
		fill(initial);
		applied.forEach((c) => {
			c.getQuadNeighbors(this.boardSize).forEach((x) => {
				this.inner[x.x][x.y].reveal();
			});
		});
	}

	public leftClick(c: Coordinate) {
		// return true if game continues, false if mine explodes
		if (c.flagged) {
			return true;
		}
		if (c.isEmpty()) {
			this.flood(c);
		}
		c.reveal();
		if (c.isMine()) {
			return false;
		}
		return true;
	}

	public rightClick(c: Coordinate) {
		const flagged = c.flag();
		this.flagged.set(c.ID(), flagged);
		return flagged;
	}
}
