import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { MinLength, MaxLength, validate } from 'class-validator'
import Teams from './Teams'
import { v4 as uuidv4 } from 'uuid'

export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum RoleEnum {
  GUEST = 'Guest',
  USER = 'User'
}

interface UserInterface {
  id: number;
  uniqueId: string;
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
  gender: GenderEnum | null;
  role: RoleEnum;
  verifiedEmail: boolean;
  verifiedMobilePhone: boolean;
  createdDate: Date;
  modifiedDate: Date;
}

@Entity({
  orderBy: {
    id: 'ASC'
  }
})
export class Users implements UserInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id!: number

  @Column({ type: 'varchar', nullable: false })
  public uniqueId!: string

  @ManyToOne(() => Teams, team => team.id)
  public team!: Teams;

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

  @Column({ type: 'timestamp', nullable: true })
  public birthDate!: string | null

  @Column({
    type: 'boolean',
    transformer: {
      from: (val: number): boolean => val === 1,
      to: (val: boolean): number => val === true ? 1 : 0
    },
    nullable: false
  })
  public active!: boolean

  @Column({ type: 'varchar', nullable: true })
  public gender!: GenderEnum

  @Column({ type: 'varchar', nullable: false })
  public role!: RoleEnum

  @Column({
    type: 'boolean',
    transformer: {
      from: (val: number): boolean => val === 1,
      to: (val: boolean): number => val === true ? 1 : 0
    },
    nullable: false
  })
  public verifiedEmail!: boolean

  @Column({
    type: 'boolean',
    transformer: {
      from: (val: number): boolean => val === 1,
      to: (val: boolean): number => val === true ? 1 : 0
    },
    nullable: false
  })
  public verifiedMobilePhone!: boolean

  @CreateDateColumn()
  public createdDate!: Date;

  @UpdateDateColumn()
  public modifiedDate!: Date;

  public validateUser (user: Users): Promise<Array<string | object>> {
    return new Promise(resolve => {
      validate(user, { skipMissingProperties: true, validationError: { target: false } })
        .then(errors => {
          const formatted = errors.map(error => error.constraints)
          resolve(formatted)
        })
    })
  }

  public generateUniqueIdentificator (): void {
    const id = uuidv4()
    this.uniqueId = id
  }
}
