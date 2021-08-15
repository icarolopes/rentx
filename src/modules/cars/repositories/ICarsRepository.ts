import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { Car } from '../infra/typeorm/entities/Cars'

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
}
