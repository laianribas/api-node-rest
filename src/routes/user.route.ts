import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';

const userRoute = Router();

userRoute.get('/users', (request: Request, response: Response, next: NextFunction) => {
  const users = [{
    userName: 'Teste'
  }]
  response.status(StatusCodes.OK).json({ users });
})

userRoute.get('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  response.status(StatusCodes.OK).json({ uuid });
})

userRoute.post('/users', (request: Request, response: Response, next: NextFunction) => {
  const newUser = request.body
  console.log(newUser)
  response.status(StatusCodes.CREATED).send({ newUser });
})

userRoute.put('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  const modifiedUser = request.body
  modifiedUser.uuid = uuid
  response.status(StatusCodes.OK).send({ modifiedUser });
})

userRoute.delete('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  response.sendStatus(StatusCodes.OK)
})

export default userRoute;
