import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT, { SignOptions } from 'jsonwebtoken';
import basicAuthMiddleware from '../middlewares/basic-auth.middleware';
import jwtAuthMiddleware from '../middlewares/jwt-auth.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';

const authorizationRoute = Router();
let refreshTokens: string[] = []

authorizationRoute.post('/token', basicAuthMiddleware, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = request.user;

    if (!user) {
      throw new ForbiddenError('Usuário não informado!');
    }

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.uuid, expiresIn: '5m' }
    const jwtRefreshOptions = { subject: user?.uuid, expiresIn: '10m' }
    const jwtSecret = 'my_secret_key'
    const jwtRefreshToken = 'my_refresh_key'

    const jwt = await JWT.sign(
      jwtPayload,
      jwtSecret,
      jwtOptions
    )

    const refreshToken = JWT.sign(
      jwtPayload,
      jwtRefreshToken,
      jwtRefreshOptions
    )

    refreshTokens.push(refreshToken)
    return response.status(StatusCodes.OK).json({ token: jwt, refreshToken })

  } catch (error) {
    next(error);
  }
})

authorizationRoute.post('/token/refresh', async (request: Request, response: Response, next: NextFunction) => {
  const refreshToken = request.header('x-auth-token');

  if (!refreshToken) {
    throw new ForbiddenError('Token inválido')
  }

  if (!refreshTokens.includes(refreshToken)) {
    throw new ForbiddenError('Token inválido')
  }

  try {
    const authUser = await JWT.verify(refreshToken, 'my_refresh_key')
    console.log(authUser.sub)
    const jwtPayload = { username: authUser.username }
    const jwtSecret = 'my_secret_key'
    const jwtOptions: SignOptions = { subject: authUser.sub }

    const jwt = JWT.sign(
      jwtPayload,
      jwtSecret,
      jwtOptions
    )
    return response.status(StatusCodes.OK).json({ jwt })
  } catch (error) {
    next(error)
  }
})

authorizationRoute.post('/token/validate', jwtAuthMiddleware, (request: Request, response: Response, next: NextFunction) => {
  response.sendStatus(StatusCodes.OK)
})

export default authorizationRoute