import { IsString, validate, MaxLength, IsDefined } from 'class-validator'
import { getDateTimeFromSeconds } from '../utils/DateUtil'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

interface TeamInterface {
  id?: number;
  name: string;
  state: string;
  foundationDate: string;
}

@Entity({
  orderBy: {
    id: 'ASC'
  }
})
class Teams implements TeamInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id!: number;

  @Column({ type: 'varchar', length: 120, nullable: false })
  @MaxLength(120, {
    message: 'Nome inválido. Numero de caracteres excedeu o limite permitido'
  })
  @IsString({
    message: 'Nome inválido. O campo aceita apenas string'
  })
  @IsDefined()
  public name!: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  @MaxLength(2, {
    message: 'Estado inválido. Os estados devem ter apenas 2 caracteres. Ex: SP'
  })
  @IsString({
    message: 'Estado inválido. O campo aceita apenas string'
  })
  public state!: string;

  @Column({ type: 'timestamp', nullable: false })
  public foundationDate!: string

  public convertToDateTime (seconds: number): string {
    const converted = getDateTimeFromSeconds(seconds)
    return converted
  }

  public validateTeam (team: Teams): Promise<Array<string | object>> {
    return new Promise(resolve => {
      validate(team, { skipMissingProperties: true, validationError: { target: false } }).then(errors => {
        const formatted = errors.map(error => error.constraints)
        resolve(formatted)
      })
    })
  }
}

export default Teams
