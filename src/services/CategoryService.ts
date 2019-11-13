import Category from '../models/Category'

class CategoryService {
  public url = `http://localhost:3000/categories`

  public fetchCategories = async (): Promise<[Category]> => {
    const response = await fetch(this.url)

    const categories = this.jsonTo(await response.json())

    return categories
  }

  public fetchCategory = async (id: number): Promise<Category> => {
    const response = await fetch(`${this.url}/${id}`)
    const categoriesJSON = await response.json()

    const category: Category = {
      id: categoriesJSON.id,
      description: categoriesJSON.description
    }
    return category
  }

  public createCategory = async (category: Category): Promise<Category> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const categories = this.jsonTo(await response.json())
    return categories[0]
  }

  public updateCategory = async (category: Category): Promise<Category> => {
    const response = await fetch(`${this.url}/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formats = this.jsonTo(await response.json())
    return formats[0]
  }

  public deleteCategory = async (category: Category): Promise<Category> => {
    const response = await fetch(`${this.url}/${category.id}`, {
      method: 'DELETE',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const formats = this.jsonTo(await response.json())
    return formats[0]
  }

  private jsonTo = (json: any): [Category] => {
    const categories = json.map((u: any) => {
      const category: Category = {
        id: u.id,
        description: u.description
      }
      return category
    })

    return categories
  }
}

export default new CategoryService()
