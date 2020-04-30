import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Mail from '../lib/Mail'
import { Users, RoleEnum } from '../entity/Users'
import HttpException from '../handlers/HttpException'

class UsersController {
  private defaultLimit = 10;
  private defaultOffset = 0

  constructor () {
    this.getUsers = this.getUsers.bind(this)
  }

  public async getUsers (req: Request, res: Response): Promise<Response> {
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const usersRepository = getRepository(Users)
    const { count } = await usersRepository.createQueryBuilder().select('COUNT(*)', 'count').getRawOne()
    const users = await usersRepository.find({
      skip: offset,
      take: limit
    })
    return res.json({
      count: parseInt(count),
      data: users
    })
  }

  public async getUsersCount (req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(Users)
    const { count } = await usersRepository.createQueryBuilder().select('COUNT(*)', 'count').getRawOne()
    return res.json({
      count: parseInt(count)
    })
  }

  public async getUserById (req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(Users)
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }

    const [user] = await usersRepository.findByIds([id])
    return res.json({
      data: user
    })
  }

  public async deleteUserById (req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(Users)
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }
    await usersRepository.delete({ id })
    return res.status(200).send({
      message: 'Usuário deletado com sucesso!'
    })
  }

  public async createUser (req: Request, res: Response): Promise<Response> {
    const { teamId, email, password, firstName, lastName } = req.body
    const user = new Users()

    user.team = teamId
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = password
    user.active = true
    user.role = RoleEnum.USER
    user.verifiedEmail = false
    user.verifiedMobilePhone = false
    user.generateUniqueIdentificator()

    console.log('Usuário Criado', user)

    try {
      const errors = await user.validateUser(user)
      if (errors.length > 0) {
        return res.json({
          message: 'Ocorreram os seguintes erros',
          errors
        })
      } else {
        const usersRepository = getRepository(Users)
        const alreadyHave = await usersRepository.findOne({ email })
        if (alreadyHave) {
          return res.status(400).send({
            message: 'O usuário já existe'
          })
        } else {
          await usersRepository.save(user)
          await Mail.sendMail({
            to: `${user.firstName} ${user.lastName} <${user.email}>`,
            subject: 'Verificação de E-mail | Sunset',
            text: `${user.firstName} ${user.lastName} seja bem-vindo à plataforma. 
                  Para que possa utilizar todos os serviços, é necessário que verifique
                  seu email em localhost:3000/verificar?tkn=${user.uniqueId}`
          })
          return res.status(200).send({
            message: 'Usuário criado com sucesso'
          })
        }
      }
    } catch (error) {
      console.log(error)
      return HttpException.mySQLError(res, error)
    }
  }

  public async verifyEmail (req: Request, res: Response): Promise<Response> {
    const { token } = req.body
    const usersRepository = getRepository(Users)
    const userToUpdate = await usersRepository.findOne({ where: { uniqueId: token } })
    if (userToUpdate) {
      userToUpdate.verifiedEmail = true
      await usersRepository.save(userToUpdate)
      return res.status(200).send({
        message: 'Perfil ativado com sucesso!'
      })
    } else {
      return res.status(400).send({
        message: 'O link de ativação é inválido'
      })
    }
  }
}

export default new UsersController()
