import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { Category } from '../../model/Category'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }
  
  execute(): Category[] {
    const categories = this.categoriesRepository.list()
    return categories
  }
}