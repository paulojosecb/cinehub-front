import User from '../models/User'

class AuthService {
  public signIn = async (email: string, password: string): Promise<User> => {
    const response = await fetch('http://localhost:3000/auth/signIn', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const usersJSON = await response.json()

    const user: User = {
      id: usersJSON.user.id,
      name: usersJSON.user.name,
      login: usersJSON.user.login,
      email: usersJSON.user.email
    }

    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('authUserRole', usersJSON.role)

    return user
  }

  public signUp = async (
    name: string,
    email: string,
    login: string,
    password: string
  ): Promise<User> => {
    const response = await fetch('http://localhost:3000/auth/signUp', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, login }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const usersJSON = await response.json()

    const user: User = {
      id: usersJSON.user.id,
      name: usersJSON.user.name,
      login: usersJSON.user.login,
      email: usersJSON.user.email
    }

    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('authUserRole', usersJSON.role)

    return user
  }

  public signout = (): boolean => {
    localStorage.removeItem('authUser')
    localStorage.removeItem('authUserRole')
    return true
  }

  public getLoggedUser = (): User | null => {
    const userStringfied = localStorage.getItem('authUser')

    if (userStringfied == null) {
      return null
    } else {
      const user = JSON.parse(userStringfied)
      return user as User
    }

    return null
  }

  public getLoggedUserRole = (): string | null => {
    const userStringfied = localStorage.getItem('authUserRole')

    if (userStringfied == null) {
      return null
    } else {
      return userStringfied
    }

    return null
  }
}

export default new AuthService()
