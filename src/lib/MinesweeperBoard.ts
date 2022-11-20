import Coordinate from "./Coordinate/Coordinate";

export default class MinesweeperBoard {
	private inner: Array<Array<Coordinate>>;
	private uniqueMemory: Map<string, boolean> = new Map<string, boolean>();
	public numCorrectFlags = 0;
	public uninitialized = true;
	public boardSize: number;
	public mineRatio: number;
	public mines: Array<Coordinate> = [];
	public numFlags: number;

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
		this.numFlags = this.numMines();
	}

	public initialize(startPoint: Coordinate) {
		this.uninitialized = false;
		this.populateWithRandomMines(startPoint);
		this.flood(startPoint);
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

	public static calculateNumMines(size: number, ratio: number): number {
		return Math.ceil(size ** 2 * ratio);
	}

	public numMines(): number {
		return MinesweeperBoard.calculateNumMines(this.boardSize, this.mineRatio);
	}

	public populateWithRandomMines(startPoint: Coordinate) {
		startPoint.getNeighbors(this.boardSize, true).forEach((n) => {
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

	public flood(origin: Coordinate) {
		const applied = new Array<Coordinate>();
		const fill = (c: Coordinate) => {
			const x = c.x;
			const y = c.y;
			if (!this.inner[x][y].isHidden) return;
			if (!this.inner[x][y].isEmpty()) return;
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
			c.getNeighbors(this.boardSize).forEach((x) => {
				if (x.isHidden) {
					if (this.inner[x.x][x.y].value > 0) {
						this.inner[x.x][x.y].reveal();
					} else {
						this.flood(this.inner[x.x][x.y]);
					}
				}
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
		// returns:
		// -1 if win
		// 0 if no effect
		// true if flagged
		// false if un-flagged
		if (this.numFlags === 0 && !c.flagged) return 0;
		const flagged = c.flag();
		if (flagged === 0) return flagged;
		else {
			if (flagged) {
				// new flag
				if (c.isMine()) this.numCorrectFlags++;
				this.numFlags--;
			} else {
				// remove flag
				if (c.isMine()) this.numCorrectFlags--;
				this.numFlags++;
			}
		}
		if (this.numCorrectFlags === this.numMines()) return -1;
		return flagged;
	}
}
