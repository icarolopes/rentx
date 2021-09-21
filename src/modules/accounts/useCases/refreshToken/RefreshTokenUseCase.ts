import { inject } from 'tsyringe'
import { sign, verify } from 'jsonwebtoken'

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { PUBLIC_KEY, PRIVATE_KEY, EXPIRES_REFRESH_TOKEN_DAYS } =
      authConfig.jwt
    const { email, sub } = verify(token, PUBLIC_KEY) as IPayload

    const user_id = sub

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, PRIVATE_KEY, {
      subject: sub,
      algorithm: 'RS256',
      expiresIn: EXPIRES_REFRESH_TOKEN_DAYS
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      EXPIRES_REFRESH_TOKEN_DAYS
    )

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}
