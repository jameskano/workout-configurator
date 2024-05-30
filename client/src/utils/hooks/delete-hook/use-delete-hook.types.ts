export interface DeleteRequestType {
	elementIds: string[];
	onSuccess?: () => void;
	onError?: () => void;
	onFinish?: () => void;
}
