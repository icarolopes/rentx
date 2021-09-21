import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { authConfig } from '@config/auth'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization
  const usersTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.jwt.PUBLIC_KEY
    ) as IPayload

    const user = usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
