import type { Socket } from "socket.io";

export interface IUserProps {
	name: string;
	flagCount: number;
	color: string;
	host: boolean;
}

export default interface IUser {
	props: IUserProps;
	socket: Socket;
}
