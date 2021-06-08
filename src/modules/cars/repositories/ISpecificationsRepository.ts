import { Specification } from '../model/Specitication'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void
  findByName(name: string): Specification
}

export { ICreateSpecificationDTO, ISpecificationsRepository }
