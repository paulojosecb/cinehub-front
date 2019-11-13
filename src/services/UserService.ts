import User from '../models/User'

class UserService {
  public fetchUsers = async (): Promise<[User]> => {
    const response = await fetch('http://localhost:3000/users')
    const usersJSON = await response.json()

    const users = usersJSON.map((u: any) => {
      const user: User = {
        id: u.id,
        name: u.name,
        login: u.login,
        email: u.email
      }
      return user
    })

    return users
  }

  public fetchUser = async (id: number): Promise<User> => {
    const response = await fetch(`http://localhost:3000/users/${id}`)
    const usersJSON = await response.json()

    const user: User = {
      id: usersJSON.id,
      name: usersJSON.name,
      login: usersJSON.login,
      email: usersJSON.email
    }

    return user
  }

  public updateUser = async (id: number, user: User): Promise<boolean> => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const u = await response.json()
    return true
  }
}

export default new UserService()
