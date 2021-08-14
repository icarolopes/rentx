import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { authConfig } from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const { privateKey, expiresIn } = authConfig.jwt

    const token = sign({}, privateKey, {
      subject: user.id,
      algorithm: 'RS256',
      expiresIn
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}
