import React from 'react'
import User from '../models/User'
import SectionTitle from '../components/SectionTitle'

interface UserDetailsPageState {
  user: User
  loading: boolean
  error: any
}

class UserDetailsPage extends React.Component<UserDetailsPageState> {
  state: UserDetailsPageState = {
    user: {},
    loading: false,
    error: {}
  }

  render() {
    const { user, loading } = this.state
    return (
      <div className="App">
        {loading ? (
          'Carregando'
        ) : (
          <div>
            <SectionTitle title="Meus dados" />
            <input
              type="text"
              name="name"
              value={user.name ? user.name : 'Carregando'}
            />
            <input
              type="text"
              name="login"
              value={user.login ? user.login : 'Carregando'}
            />
            <input
              type="text"
              name="email"
              value={user.email ? user.email : 'Carregando'}
            />
            <button>Logout</button>
            <button>Atualizar</button>
          </div>
        )}
      </div>
    )
  }
}

export default UserDetailsPage
