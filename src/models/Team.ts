import { TeamInterface } from '../interfaces/TeamInterface'
import { getDateTimeFromMilli } from '../utils/DateUtil'

class Team implements TeamInterface {
  public name: string;
  public state: string;
  public foundationDate: string

  constructor (name: string, state: string, foundationDate: number) {
    this.name = name
    this.state = state
    this.foundationDate = this.convertToDateTime(foundationDate)
  }

  private convertToDateTime (milliseconds: number): string {
    const converted = getDateTimeFromMilli(milliseconds)
    return converted
  }
}

export default Team
