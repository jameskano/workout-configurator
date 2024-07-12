export interface LoginModalContextType {
	loginData: LoginDataType;
	setLoginDataHandler: (value?: LoginDataType) => void;
	token: string;
	setToken: (value: string) => void;
	userId: string;
	setUserId: (value: string) => void;
	loadingTokenChecking: boolean;
	setLoadingTokenChecking: (value: boolean) => void;
}

export interface LoginDataType {
	email: string;
	password: string;
}
