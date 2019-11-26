import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import * as ROUTES from './constants/routes'

import * as PAGES from './pages'
import NavBar from './components/NavBar/NavBar'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path={ROUTES.ADMIN} exact component={PAGES.AdminPage} />
        <Route
          path={`${ROUTES.USER}/:user_id${ROUTES.MOVIE_DETAIL}/:id`}
          exact
          component={PAGES.MovieDetailPage}
        />
        <Route
          path={`${ROUTES.USER}/:user_id${ROUTES.SERIE_DETAIL}/:id`}
          exact
          component={PAGES.SerieDetailPage}
        />
        <Route
          path={`${ROUTES.HOME}/:user_id`}
          exact
          component={PAGES.HomePage}
        />
        <Route path={'/'} exact component={PAGES.HomePage} />
        <Route path={ROUTES.INPUT} exact component={PAGES.InputPage} />
        <Route path={ROUTES.LOGIN} exact component={PAGES.LoginPage} />
        <Route path={ROUTES.SIGNUP} exact component={PAGES.SignupPage} />
        <Route
          path={`${ROUTES.USER_DETAILS}/:id`}
          exact
          component={PAGES.UserDetailsPage}
        />
        <Route path={ROUTES.USERS} exact component={PAGES.UsersPage} />
        <Route
          path={`${ROUTES.USER}/:user_id`}
          exact
          component={PAGES.OtherUserPage}
        />
      </Switch>
    </div>
  )
}

export default App
