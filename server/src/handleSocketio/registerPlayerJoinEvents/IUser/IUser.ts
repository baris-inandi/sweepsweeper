export interface IUserProps {
	name: string;
	flagCount: number;
	color: string;
}

export default interface IUser {
	props: IUserProps;
	socket: any;
}
