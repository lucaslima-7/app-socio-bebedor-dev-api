import { IsString } from 'class-validator'
import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm'

interface TeamInterface {
  id?: number;
  name: string;
  active: boolean;
}

@Entity()
@Unique(['name'])
class Teste implements TeamInterface {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  @IsString()
  public name: string;

  @Column({
    default: false
  })
  public active: boolean;

  constructor (name: string, active: boolean) {
    this.name = name
    this.active = active
  }
}

export default Teste
