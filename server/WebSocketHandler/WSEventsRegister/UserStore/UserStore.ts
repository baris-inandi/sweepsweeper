import IUser from "../IUser/IUser.ts";

export default class UserStore {
	innerStore = new Map<string, Map<string, IUser>>();

	public registerUser(roomID: string, userID: string, name: string) {
		if (this.innerStore.has(roomID)) {
			this.innerStore.get(roomID)?.set(userID, {
				name,
				flagCount: 0
			});
		} else {
			this.innerStore.set(roomID, new Map<string, IUser>());
		}
	}

	public removeUser(roomID: string, userID: string) {
		this.innerStore.get(roomID)?.delete(userID);
	}

	public getUser(roomID: string, userID: string) {
		return this.innerStore.get(roomID)?.get(userID);
	}

	public getRoom(roomID: string) {
		return this.innerStore.get(roomID);
	}

	public forEach(
		roomID: string,
		callback: (value: IUser, key: string) => void
	) {
		this.innerStore.get(roomID)?.forEach(callback);
	}
}
