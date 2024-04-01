export const removeIdField = (object: Record<string, unknown>) => {
	const newObject = { ...object };
	delete newObject.id;
	return newObject;
};
