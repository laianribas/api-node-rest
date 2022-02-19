import express, { Request, Response, NextFunction } from 'express';
import userRoute from './routes/user.route';
const app = express();
app.listen(3003, () => {
  console.log('listening on port 3003');
});
app.get('/status', (request: Request, response: Response, next: NextFunction) => {
  response.status(200).send({ foo: 'Sucesso' });
});
app.use(userRoute)