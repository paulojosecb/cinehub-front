import React, { SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import User from '../../models/User'

import * as ROUTES from '../../constants/routes'

import AuthService from '../../services/AuthService'

import './LoginPage.css'

// interface LoginPageProps extends RouteComponentProps {}

interface LoginPageState {
  email: string
  password: string
}

class LoginPage extends React.Component<RouteComponentProps, LoginPageState> {
  state: LoginPageState = {
    email: '',
    password: ''
  }

  handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    switch (target.name) {
      case 'email':
        this.setState({ email: target.value })
        break
      case 'password':
        this.setState({ password: target.value })
        break
    }
  }

  handleSignUp = () => {
    const { history } = this.props
    history.push(ROUTES.SIGNUP)
  }

  handleSubmitButton = () => {
    const { email, password } = this.state
    const { history } = this.props
    AuthService.signIn(email, password)
      .then(user => {
        if (user && AuthService.getLoggedUserRole() === 'user') {
          history.push(`${ROUTES.HOME}/${user.id}`)
        } else if (user && AuthService.getLoggedUserRole() === 'admin') {
          history.push(`${ROUTES.ADMIN}`)
        }
      })
      .catch(error => {
        notify.show('Ocorreu um erro ao fazer o login', 'warning')
      })
  }

  componentDidMount() {
    const { history } = this.props

    const user = AuthService.getLoggedUser()
    if (user && AuthService.getLoggedUserRole() === 'user') {
      history.push(`${ROUTES.HOME}/${user.id}`)
    } else if (user && AuthService.getLoggedUserRole() === 'admin') {
      history.push(`${ROUTES.ADMIN}/${user.id}`)
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="LoginPage">
        <Notifications />
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSignUp}>Cadastrar</button>
        <button onClick={this.handleSubmitButton}>Entrar</button>
      </div>
    )
  }
}

export default withRouter(LoginPage)
