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
      id: categoriesJSON ? categoriesJSON.id : null,
      description: categoriesJSON ? categoriesJSON.description : 'Indefinido'
    }

    return category
  }

  public createCategory = async (description: string): Promise<Category> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({ description: description }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const categoryJSON = await response.json()

    const category: Category = {
      id: categoryJSON.id ? categoryJSON.id : null,
      description: categoryJSON.description
    }
    return category
  }

  public updateCategory = async (category: Category): Promise<boolean> => {
    const response = await fetch(`${this.url}/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    if (!res.error) {
      return true
    } else {
      return false
    }
  }

  public deleteCategory = async (category: Category): Promise<boolean> => {
    const response = await fetch(`${this.url}/${category.id}`, {
      method: 'DELETE',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    if (!res.error) {
      return true
    } else {
      return false
    }
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
