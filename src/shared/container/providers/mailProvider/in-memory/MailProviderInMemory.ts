import { IMailProvider } from '../IMailProvider'

export class MailProviderInMemory implements IMailProvider {
  message: any[] = []
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path
    })

    console.log(this.message[this.message.length - 1])
  }
}
