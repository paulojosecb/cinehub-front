import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle/SectionTitle'
import User from '../models/User'

import UserService from '../services/UserService'

import * as ROUTES from '../constants/routes'

interface UsersPageState {
  users: User[]
}

class UsersPage extends React.Component<RouteComponentProps, UsersPageState> {
  state: UsersPageState = {
    users: []
  }

  componentDidMount() {
    UserService.fetchUsers().then(users => this.setState({ users }))
  }

  handleUserClick = (id: number) => {
    const { history } = this.props
    history.push(`${ROUTES.USER}/${id}`)
  }

  render() {
    const { users } = this.state
    return (
      <div className="App">
        <SectionTitle title="Outros usuários" />
        <div>
          {users.map(user => {
            return (
              <div
                key={user.id}
                onClick={() => this.handleUserClick(user.id ? user.id : 1)}
              >
                <p>{user.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(UsersPage)
