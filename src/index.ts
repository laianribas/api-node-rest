import express, { Request, Response, NextFunction } from 'express';
const app = express();
app.listen(3003, () => {
  console.log('listening on port 3003');
})
app.get('/status', (request: Request, response: Response, next: NextFunction) => {
  response.status(200).send({ foo: 'bau' });
})