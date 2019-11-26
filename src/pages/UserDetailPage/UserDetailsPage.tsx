import React, { SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import User from '../../models/User'

import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'

import * as ROUTES from '../../constants/routes'

import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Notifications, { notify } from 'react-notify-toast'

import './UserDetailPage.css'

interface UserDetailsPageState {
  user: User
  loading: boolean
  error: any
}

type Params = {
  id: string
}

class UserDetailsPage extends React.Component<
  RouteComponentProps<Params>,
  UserDetailsPageState
> {
  state: UserDetailsPageState = {
    user: {},
    loading: false,
    error: null
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props

    const user = AuthService.getLoggedUser()

    if (user) {
      this.setState({ user: user })
    } else {
      this.setState({ error: { message: 'Ocorreu um erro' } })
    }
  }

  handleLogout = () => {
    const { history } = this.props

    if (AuthService.signout()) {
      history.push(ROUTES.LOGIN)
    }
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const { user } = this.state

    switch (target.name) {
      case 'name':
        user.name = target.value
        break
      case 'login':
        user.login = target.value
        break
      case 'email':
        user.email = target.value
        break
      default:
        console.log('Error')
        break
    }

    this.setState({ user: user })
  }

  handleUpdate = () => {
    const { user } = this.state

    if (user && user.id) {
      UserService.updateUser(user.id, user)
        .then(updated => {
          AuthService.updatedLogged(user)
          const newUser = AuthService.getLoggedUser()
          console.log(newUser)
          if (newUser) this.setState({ user: newUser })
          notify.show('Atualizado', 'success')
        })
        .catch(error => {
          notify.show('Ocorreu um erro', 'warning')
        })
    }
  }

  render() {
    const { user, loading } = this.state
    return (
      <div className="UserDetailPage">
        <Notifications />
        {loading ? (
          'Carregando'
        ) : (
          <div className="UserDetailPage">
            <SectionTitle title="Meus dados" />
            <input
              type="text"
              name="name"
              value={user.name ? user.name : 'Carregando'}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="login"
              value={user.login ? user.login : 'Carregando'}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={user.email ? user.email : 'Carregando'}
              onChange={this.handleInputChange}
            />
            <div className="UserDetailsPage_actions">
              <button onClick={this.handleLogout}>Logout</button>
              <button onClick={this.handleUpdate}>Atualizar</button>
            </div>
           
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(UserDetailsPage)
