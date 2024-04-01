export const bodyPartToLowerCase = (value: string | number | null, name: string) => {
	if (name === "bodyPart" && typeof value === "string") return value.toLowerCase();
	return value;
};
