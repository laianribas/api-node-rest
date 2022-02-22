import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";


async function bearerAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    const authorizationHeader = request.headers['authorization']

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas')
    }

    const [authenticationType, token] = authorizationHeader.split(' ')

    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Autenticaçao inválida')
    }

    const tokenPayload = JWT.verify(token, 'my_secret_key');

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido!')
    }

    const user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username
    }

    request.user = user
    next()
  } catch (error) {
    next(error);
  }
}

export default bearerAuthMiddleware