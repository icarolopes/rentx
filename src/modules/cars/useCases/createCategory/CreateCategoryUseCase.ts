import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    const category = this.categoriesRepository.create({ name, description })

    return category
  }
}
