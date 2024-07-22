export interface RegisterContextType {
	registerData: RegisterDataType;
	setRegisterDataHandler: (value?: RegisterDataType) => void;
}

export interface RegisterDataType {
	username: string;
	email: string;
	password: string;
	checkPassword: string;
}
