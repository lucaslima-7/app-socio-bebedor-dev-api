const {
  EMAIL_USER,
  EMAIL_PASS
} = process.env

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  default: {
    from: 'Equipe <noreply@equipe.com.br>'
  }
}
