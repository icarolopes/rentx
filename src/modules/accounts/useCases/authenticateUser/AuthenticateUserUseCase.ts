import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { authConfig } from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'

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
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
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

    const { PRIVATE_KEY, EXPIRES_IN, EXPIRES_REFRESH_TOKEN_DAYS } =
      authConfig.jwt

    const token = sign({}, PRIVATE_KEY, {
      subject: user.id,
      algorithm: 'RS256',
      expiresIn: EXPIRES_IN
    })

    const refresh_token = sign({ email }, PRIVATE_KEY, {
      subject: user.id,
      algorithm: 'RS256',
      expiresIn: EXPIRES_IN
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      EXPIRES_REFRESH_TOKEN_DAYS
    )

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }
  }
}
