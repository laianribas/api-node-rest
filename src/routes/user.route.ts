import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const userRoute = Router();

userRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  response.status(StatusCodes.OK).json(users);
})

userRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  const user = await userRepository.findById(uuid)
  response.status(StatusCodes.OK).json(user);
})

userRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
  const newUser = request.body
  const uuid = await userRepository.create(newUser)
  response.status(StatusCodes.CREATED).send(uuid);
})

userRoute.put('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  const modifiedUser = request.body
  modifiedUser.uuid = uuid
  await userRepository.updade(modifiedUser)
  response.sendStatus(StatusCodes.OK).send();
})

userRoute.delete('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  await userRepository.removeUser(uuid)
  response.sendStatus(StatusCodes.OK)
})

export default userRoute;
