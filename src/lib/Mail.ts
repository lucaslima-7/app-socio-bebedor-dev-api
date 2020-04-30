import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'
import mailConfig from '../config/mail'

class Mail {
  public transporter: Transporter

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
      }
    })
  }

  public sendMail (message: object): Promise<SendMailOptions> {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    })
  }
}

export default new Mail()
