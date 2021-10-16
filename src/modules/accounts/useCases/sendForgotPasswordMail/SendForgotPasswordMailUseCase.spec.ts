import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/mailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: '872099968',
      email: 'ni@evbawwow.fk',
      name: 'Eugene Walton',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('ni@evbawwow.fk')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ro@lodenzob.tc')
    ).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    )

    usersRepositoryInMemory.create({
      driver_license: '2386951030',
      email: 'lon@le.to',
      name: 'Jerome Shelton',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('lon@le.to')

    expect(generateTokenMail).toBeCalled()
  })
})
