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

  public fetchUser = async (user: number): Promise<User> => {
    const response = await fetch(`http://localhost:3000/users/${user}`)
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

    return users[0]
  }
}

export default new UserService()
