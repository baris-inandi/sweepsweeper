import SquareMatrix from "./SquareMatrix/SquareMatrix";

export default class MinesweeperBoard {
	public boardSize: number;
	innerMatrix: SquareMatrix;

	public toString(): string {
		return this.innerMatrix.toString();
	}

	constructor(boardSize: number) {
		console.log(`Creating new ${boardSize}x${boardSize} game board...`);
		this.boardSize = boardSize;
		this.innerMatrix = new SquareMatrix(boardSize);
		this.innerMatrix.populateWithRandomMines();
		console.log("Board created:");
		console.log(this.toString());
	}
}
