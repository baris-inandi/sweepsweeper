import { customAlphabet } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

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
