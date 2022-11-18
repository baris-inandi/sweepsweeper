import Coordinate from "./Coordinate/Coordinate";
import MinesweeperArea from "./SquareMatrix/MinesweeperArea";

export default class SquareMatrix {
	private inner: Array<Array<MinesweeperArea>>;
	private uniqueMemory: Map<string, boolean> = new Map<string, boolean>();
	boardSize: number;

	constructor(boardSize: number) {
		const inner = Array(boardSize).fill([]);
		for (let i = 0; i < inner.length; i++) {
			inner[i] = Array(boardSize).fill(MinesweeperArea.emptyArea());
		}
		this.inner = inner;
		this.boardSize = boardSize;
		this.populateWithRandomMines();
		console.log(this.toString());
	}

	public toString(): string {
		let out = "";
		this.inner.forEach((i) => {
			i.forEach((j) => {
				out += j.toString() + " ";
			});
			out += "\n";
		});
		return out;
	}

	public populateWithRandomMines() {
		const mines: string[] = [];
		const numMines = Math.ceil(this.boardSize ** 2 / 4.85);
		Array(numMines)
			.fill(undefined)
			.forEach(() => {
				const c = this.randomUniqueCoordinate();
				mines.push(c.toString());
				this.inner[c.x][c.y] = MinesweeperArea.mine();
			});
		let out = "ZZZZ|\n";
		for (let i = 0; i < this.boardSize; i++) {
			for (let j = 0; j < this.boardSize; j++) {
				if (this.inner[i][j].isMine) {
					out += "x ";
					continue;
				}
				const neighboringMines = Coordinate.neighborsOf(j, i).filter((c) => {
					return mines.includes(c.toString());
				});
				console.log(i, j, neighboringMines);
				out += neighboringMines.length + " ";
			}
			out += "\n";
		}
		console.log(out);
	}

	private randomUniqueCoordinate(): Coordinate {
		const limit = this.boardSize;
		const rand = Coordinate.randomSquareCoordinate(limit);
		let randStr = Coordinate.randomSquareCoordinate(limit).toString();
		while (this.uniqueMemory.get(randStr)) {
			randStr = Coordinate.randomSquareCoordinate(limit).toString();
		}
		return rand;
	}
}
