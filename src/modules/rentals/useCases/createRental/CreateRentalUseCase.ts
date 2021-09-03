import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'

dayjs.extend(utc)
interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHour = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    )

    if (compare < minimumHour) {
      throw new AppError('Invalid Return time!')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}