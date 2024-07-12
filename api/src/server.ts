import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import exerciseRoutes from './routes/exercise';
import workoutRoutes from './routes/workout';
import userRoutes from './routes/user';
import errorHandler from './middleware/error-handler';
import { CustomError } from './utils/classes/errors';
import { corsOptions } from './middleware/cors';
import passport from 'passport';
import './utils/config/passport';
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors(corsOptions));

app.use(passport.initialize());

// Connect to DB
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING!)
	.then(() => {
		console.log('Connected to database');
		app.listen(port, () => console.log(`Server running on port ${port}`));
	})
	.catch((error) => console.log(`Error connecting the database: ${error}`));

// Routes
app.use('/api/exercise', exerciseRoutes);

app.use('/api/workout', workoutRoutes);

app.use('/api/user', userRoutes);

// Error handling
app.use((req, res, next) => {
	next(new CustomError(404, 'Endpoint not found'));
});

app.use(errorHandler);
