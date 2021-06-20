import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

// TODO: Definir o tipo de retorno
// TODO: Alterar o retorno de erro
// TODO: Acessar o repositorio

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
