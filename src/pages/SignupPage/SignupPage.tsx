import React, { SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Notification, { notify } from 'react-notify-toast'

import * as ROUTES from '../../constants/routes'

import AuthService from '../../services/AuthService'

import './SignupPage.css'

interface SignupPageState {
  name: string
  login: string
  email: string
  password: string
  confirmPassword: string
}

class SignupPage extends React.Component<RouteComponentProps, SignupPageState> {
  state: SignupPageState = {
    name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    switch (target.name) {
      case 'name':
        this.setState({ name: target.value })
        break
      case 'login':
        this.setState({ login: target.value })
        break
      case 'email':
        this.setState({ email: target.value })
        break
      case 'password':
        this.setState({ password: target.value })
        break
      case 'confirmPassword':
        this.setState({ confirmPassword: target.value })
        break
    }
  }

  handleSignIn = () => {
    const { history } = this.props
    history.push(ROUTES.LOGIN)
  }

  handleSubmitButton = () => {
    const { name, login, email, password, confirmPassword } = this.state
    const { history } = this.props
    AuthService.signUp(name, email, login, password)
      .then(user => history.push(`${ROUTES.HOME}/${user.id}`))
      .catch(error => {
        notify.show('Ocorreu um erro ao fazer o login', 'warning')
      })
  }

  render() {
    const { name, login, email, password, confirmPassword } = this.state
    return (
      <div className="SignupPage">
        <Notification />
        <h2>Cadastro</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={login}
          onChange={this.handleInputChange}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSignIn}>Logar</button>
        <button onClick={this.handleSubmitButton}>Cadastrar</button>
      </div>
    )
  }
}

export default withRouter(SignupPage)
