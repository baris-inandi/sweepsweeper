import Coordinate from "./Coordinate/Coordinate";

const MINE_RATIO = 0.15;

export default class Board {
	private inner: Array<Array<Coordinate>>;
	private uniqueMemory: Map<string, boolean> = new Map<string, boolean>();
	private uninitialized = true;
	boardSize: number;

	constructor(boardSize: number, startPoint: Coordinate | null) {
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
		return out + outShort;
	}

	public coordinateAt(x: number, y: number) {
		return this.inner[x][y];
	}

	public populateWithRandomMines(startPoint: Coordinate) {
		startPoint.getNeighbors(this.boardSize).forEach((n) => {
			this.uniqueMemory.set(n.ID(), true);
		});
		this.uniqueMemory.set(startPoint.ID(), true);
		const numMines = Math.ceil(this.boardSize ** 2 * MINE_RATIO);
		Array(numMines)
			.fill(undefined)
			.forEach(() => {
				const c = this.generateUniqueRandomMineCoordinate();
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
			if (initialFlood && applied.length > this.boardSize ** 2 * 0.5) return;
			this.inner[x][y].show();
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
				this.inner[x.x][x.y].show();
			});
		});
	}

	public leftClick(c: Coordinate) {
		if (this.uninitialized) {
			this.initialize(c);
			this.uninitialized = false;
		}
	}

	public rightClick(c: Coordinate) {
		// c.flag()
		console.log("UNIMPLEMENTED");
	}
}
