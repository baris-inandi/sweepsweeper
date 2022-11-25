import { IUserProps } from "./../IUser/IUser.ts";
import IUser from "../IUser/IUser.ts";

export type Room = Map<string, IUser>;

export default class UserStore {
	innerStore = new Map<string, Room>();

	public registerUser(roomID: string, socket: any, name: string) {
		if (!this.innerStore.has(roomID)) {
			// if key of roomID does not exist, create it
			console.log("Created room " + roomID);
			this.innerStore.set(roomID, new Map<string, IUser>());
		}
		this.innerStore.get(roomID)?.set(socket.id, {
			props: {
				name,
				flagCount: 0
			},
			socket
		});
	}

	public removeUser(roomID: string, userID: string) {
		this.innerStore.get(roomID)?.delete(userID);
		if (this.innerStore.get(roomID)?.size === 0) {
			// close room when no users left
			this.innerStore.delete(roomID);
			console.log("Closed room " + roomID);
		}
	}

	public getUser(roomID: string, userID: string) {
		return this.innerStore.get(roomID)?.get(userID)?.props;
	}

	public getUsersInRoom(roomID: string) {
		const room = this.innerStore.get(roomID);
		const out = new Array<IUserProps>();
		room?.forEach((v, k) => {
			out.push(v.props);
		});
		return out;
	}

	public forEachInRoom(
		roomID: string,
		callback: (value: IUser, key: string) => void
	) {
		this.innerStore.get(roomID)?.forEach(callback);
	}

	public emitForRoom(roomID: string, event: string, ...data: any) {
		this.forEachInRoom(roomID, (user, _) => {
			user.socket.emit(event, data);
		});
	}
}
