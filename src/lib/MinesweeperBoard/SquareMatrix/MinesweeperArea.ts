export default class MinesweeperArea {
	public isMine;
	public value;
	public isEmpty;

	public static emptyArea(): MinesweeperArea {
		return new MinesweeperArea(0, false, true);
	}

	public static mine(): MinesweeperArea {
		return new MinesweeperArea(0, true);
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
