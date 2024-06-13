import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/classes/errors';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof CustomError) {
		res.status(error.statusCode).json({ error: error.message });
	} else {
		res.status(500).json({ error: error.message || 'Something went wrong!' });
	}
};

export default errorHandler;
