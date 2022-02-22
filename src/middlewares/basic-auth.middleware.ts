import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    const authorizationHeader = request.headers['authorization']

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas')
    }

    const [authenticationType, token] = authorizationHeader.split(' ')

    if (authenticationType !== 'Basic' || !token) {
      throw new ForbiddenError('Autenticaçao inválida')
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

    const [username, password] = tokenContent.split(':')

    if (!username || !password) {
      throw new ForbiddenError('Credenciais não preenchidas')
    }

    const user = await userRepository.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos!')
    }

    request.user = user
    next();
  } catch (error) {
    next(error);
  }
}

export default basicAuthMiddleware