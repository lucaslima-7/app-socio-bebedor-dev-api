import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { MinLength, MaxLength } from 'class-validator'

interface UserInterface {
  id: number;
  federalId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  ddi: string | null;
  ddd: string | null;
  mobilePhone: string | null;
  profilePic: string | null;
  birthDate: string | null;
  active: boolean;
  gender: string | null;
  role: string;
  verifiedEmail: boolean;
  verifiedMobilePhone: boolean;
}

@Entity({
  orderBy: {
    id: 'ASC'
  }
})
class Users implements UserInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id!: number

  @Column({ type: 'varchar', length: 14, nullable: true })
  @MinLength(14, {
    message: 'CPF inválido. Ao mandar o CPF certifique-se de enviá-lo com ponto e traço'
  })
  public federalId!: string

  @Column({ type: 'varchar', nullable: false })
  public email!: string

  @Column({ type: 'varchar', nullable: false })
  public password!: string

  @Column({ type: 'varchar', length: 30, nullable: false })
  @MaxLength(30, {
    message: 'Nome Inválido. O Nome excedeu a quantidade de caracteres permitidos'
  })
  public firstName!: string

  @Column({ type: 'varchar', nullable: false })
  public lastName!: string

  @Column({ type: 'varchar', nullable: true })
  public ddi!: string | null

  @Column({ type: 'varchar', nullable: true })
  public ddd!: string | null

  @Column({ type: 'varchar', nullable: true })
  public mobilePhone!: string | null

  @Column({ type: 'varchar', nullable: true })
  public profilePic!: string | null

  @Column({ type: 'datetime', nullable: true })
  public birthDate!: string | null

  @Column({ type: 'varchar', nullable: true })
  public active!: boolean

  // This is not String, is a Enum
  public gender!: string

  // This is not string, is Enum
  public role!: string
  public verifiedEmail!: boolean
  public verifiedMobilePhone!: boolean
}

export default Users
