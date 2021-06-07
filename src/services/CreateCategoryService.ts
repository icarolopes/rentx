import { CategoriesRepository } from 'repositories/CategoriesRepository'

interface IRequest {
  name: string
  description: string
}

// TODO: Definir o tipo de retorno
// TODO: Alterar o retorno de erro
// TODO: Acessar o repositorio

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}
