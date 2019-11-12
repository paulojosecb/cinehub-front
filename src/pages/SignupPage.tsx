import React, { SyntheticEvent } from 'react'

interface SignupPageState {
  name: string
  login: string
  email: string
  password: string
  confirmPassword: string
}

class SignupPage extends React.Component<SignupPageState> {
  state: SignupPageState = {
    name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleInputChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { name, login, email, password, confirmPassword } = this.state
    return (
      <div className="App">
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
        <button>Cadastrar</button>
      </div>
    )
  }
}

export default SignupPage
