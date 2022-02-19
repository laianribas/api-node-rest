import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes'

const userRoute = Router();

userRoute.get('/users', (request: Request, response: Response, next: NextFunction) => {
  const users = [{
    userName: 'Renan'
  }]
  response.status(StatusCodes.OK).json({ users });
})

userRoute.get('/users/:uuid', (request: Request, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid

  response.status(StatusCodes.OK).json({ uuid });
})

export default userRoute;
