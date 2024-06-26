export interface LoginModalContextType {
	loginData: LoginDataType;
	setLoginDataHandler: (value?: LoginDataType) => void;
}

export interface LoginDataType {
	email: string;
	password: string;
}
