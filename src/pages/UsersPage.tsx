import React from 'react'
import SectionTitle from '../components/SectionTitle'
import User from '../models/User'

import UserService from '../services/UserService'

interface UsersPageState {
  users: User[]
}

class UsersPage extends React.Component<UsersPageState> {
  state: UsersPageState = {
    users: []
  }

  componentDidMount() {
    UserService.fetchUsers().then(users => this.setState({ users }))
  }

  render() {
    const { users } = this.state
    return (
      <div className="App">
        <SectionTitle title="Outros usuários" />
        <div>
          {users.map(user => {
            return (
              <div key={user.id}>
                <p>{user.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default UsersPage
