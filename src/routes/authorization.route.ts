import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import basicAuthMiddleware from '../middlewares/basic-auth.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthMiddleware, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = request.user;

    if (!user) {
      throw new ForbiddenError('Usuário não informado!');
    }

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.uuid }
    const jwtSecret = 'my_secret_key'

    const jwt = JWT.sign(jwtPayload, jwtSecret, jwtOptions)

    return response.status(StatusCodes.OK).json({ token: jwt })
  } catch (error) {
    next(error);
  }
})

export default authorizationRoute