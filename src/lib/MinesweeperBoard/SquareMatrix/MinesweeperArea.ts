export default class MinesweeperArea {
	public isMine: boolean;
	public value: number;
	public isEmpty: boolean;

	public setValue(value: number) {
		this.isEmpty = false;
		this.value = value;
	}

	public markNonEmpty() {
		this.isEmpty = false;
	}

	public static emptyArea(): MinesweeperArea {
		return new MinesweeperArea(-1, false, true);
	}

	public static mine(): MinesweeperArea {
		return new MinesweeperArea(-1, true);
	}

	public toString(): string {
		if (this.isEmpty) {
			return "E ";
		}
		return this.isMine ? "* " : this.value + " ";
	}

	constructor(value: number, isMine = false, isEmpty = false) {
		this.isMine = isMine;
		this.value = value;
		this.isEmpty = isEmpty;
	}
}
