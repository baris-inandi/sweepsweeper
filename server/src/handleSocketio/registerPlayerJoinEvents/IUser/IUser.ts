export interface IUserProps {
	name: string;
	flagCount: number;
}

export default interface IUser {
	props: IUserProps;
	socket: any;
}
