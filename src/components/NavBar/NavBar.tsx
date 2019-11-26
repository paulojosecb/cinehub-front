import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './NavBar.css'

import * as ROUTES from '../../constants/routes'
import AuthService from '../../services/AuthService'

const handleOtherUserClick = (props: RouteComponentProps) => {
  const { history } = props
  history.push(ROUTES.USERS)
}

const handleLogoClick = (props: RouteComponentProps) => {
  const { history } = props
  const user = AuthService.getLoggedUser()
  if (user) {
    history.push(`${ROUTES.HOME}/${user.id}`)
  } else {
    history.push(ROUTES.LOGIN)
  }
}

const handleDetailsClick = (props: RouteComponentProps) => {
  const { history } = props
  const user = AuthService.getLoggedUser()
  if (user) {
    history.push(`${ROUTES.USER_DETAILS}/${user.id}`)
  } else {
    history.push(ROUTES.LOGIN)
  }
}

const NavBar: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <div className="NavBar">
      <p onClick={() => handleOtherUserClick(props)}>Outros usuários</p>
      <p onClick={() => handleLogoClick(props)}>CineHub</p>
      <p onClick={() => handleDetailsClick(props)}>Meus dados</p>
    </div>
  )
}

export default withRouter(NavBar)
