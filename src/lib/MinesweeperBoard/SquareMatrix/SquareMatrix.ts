import Coordinate from "../Coordinate/Coordinate";
import MinesweeperArea from "./MinesweeperArea";

export default class SquareMatrix {
	private inner: Array<Array<MinesweeperArea>>;
	private memory: Map<string, boolean> = new Map<string, boolean>();
	len: number;

	constructor(length: number) {
		const inner = Array(length).fill([]);
		for (let i = 0; i < inner.length; i++) {
			inner[i] = Array(length).fill(MinesweeperArea.emptyArea());
		}
		this.inner = inner;
		this.len = length;
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
		const numMines = Math.ceil(this.len ** 2 / 4.85);
		Array(numMines)
			.fill(undefined)
			.forEach(() => {
				const c = this.randomUniqueCoordinate();
				console.log(`Placed random mine at coordinate ${c.toString()}`);
				this.inner[c.x][c.y] = MinesweeperArea.mine();
			});
	}

	private randomUniqueCoordinate(): Coordinate {
		const limit = this.len;
		const rand = Coordinate.randomSquareCoordinate(limit);
		let randStr = Coordinate.randomSquareCoordinate(limit).toString();
		while (this.memory.get(randStr)) {
			randStr = Coordinate.randomSquareCoordinate(limit).toString();
		}
		return rand;
	}
}
