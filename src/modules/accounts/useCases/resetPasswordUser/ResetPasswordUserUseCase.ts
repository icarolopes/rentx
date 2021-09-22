import { inject, injectable } from 'tsyringe'

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { hash } from 'bcrypt'

interface IRequest {
  token: string
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    const isNotValidToken = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )

    if (isNotValidToken) {
      throw new AppError('Token expired!')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}
