import { validateID } from "../roomID/roomID";
import type { Socket } from "socket.io";
import type IUser from "../IUser/IUser";
import type { IUserProps } from "../IUser/IUser";
import generateRandomColor from "./utils/generateRandomColor";

export type Room = Map<string, IUser>;

export default class UserStore {
	innerStore = new Map<string, Room>();

	public setPlayerReady(roomID: string, userID: string) {
		const user = this.innerStore.get(roomID)?.get(userID);
		if (user) {
			console.log("cccccccccc");
			user.props.ready = !user.props.ready;
			return user.props.ready;
		}
		console.log("dddddddd");
		return false;
	}

	public registerUser(roomID: string, socket: Socket, name: string) {
		let host = false;
		if (name.length > 15) name = name.substring(0, 15);
		if (!this.innerStore.has(roomID)) {
			// if key of roomID does not exist, create it
			console.log("Created room " + roomID);
			host = true;
			this.innerStore.set(roomID, new Map<string, IUser>());
		}
		this.innerStore.get(roomID)?.set(socket.id, {
			props: {
				name,
				flagCount: 0,
				color: generateRandomColor(),
				host,
				ready: false
			},
			socket
		});
	}

	public roomExists(roomID: string): boolean {
		return this.innerStore.has(roomID);
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
		room?.forEach((v, _) => {
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
			user.socket.emit(event, ...data);
		});
	}

	public isJoinableAt(roomID: string): { error: string; joinable: boolean } {
		if (!validateID(roomID))
			return { error: "Not a valid room ID", joinable: false };
		if (!this.roomExists(roomID))
			return { error: "Room does not exist", joinable: false };
		if (this.getUsersInRoom(roomID).length >= 20)
			return { error: "Room has too many players", joinable: false };
		return { error: "", joinable: true };
	}
}
