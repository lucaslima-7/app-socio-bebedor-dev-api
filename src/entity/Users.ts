import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { MinLength } from 'class-validator'

interface UserInterface {
  id: number;
  federalId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  ddi: string;
  ddd: string;
  mobilePhone: string;
  profilePic: string;
  birthDate: Date;
  active: boolean;
  gender: string;
  role: string;
}

class Users implements UserInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id!: number

  @Column({ type: 'varchar', length: 14, nullable: true })
  @MinLength(14, {
    message: 'CPF inválido. Ao mandar o CPF certifique-se de enviá-lo com ponto e traço'
  })
  public federalId!: string

}

export default Users
