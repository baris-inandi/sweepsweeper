import { customAlphabet } from "nanoid";

const ID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 8;

export const generateID = customAlphabet(ID_ALPHABET, ID_LENGTH);

export const validateID = (id: string) => {
	return (
		id.length === ID_LENGTH &&
		id.split("").every((a: string) => {
			return ID_ALPHABET.includes(a);
		})
	);
};
