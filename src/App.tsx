import React from 'react'
import { Switch, Route } from 'react-router-dom'

import * as ROUTES from './constants/routes'

import * as PAGES from './pages'
import { NavBar } from './components/NavBar'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path={ROUTES.ADMIN} exact component={PAGES.AdminPage} />
        <Route
          path={ROUTES.MOVIE_DETAIL}
          exact
          component={PAGES.MovieDetailPage}
        />
        <Route
          path={ROUTES.SERIE_DETAIL}
          exact
          component={PAGES.SerieDetailPage}
        />
        <Route path={ROUTES.HOME} exact component={PAGES.HomePage} />
        <Route path={'/'} exact component={PAGES.HomePage} />
        <Route path={ROUTES.INPUT} exact component={PAGES.InputPage} />
        <Route path={ROUTES.LOGIN} exact component={PAGES.LoginPage} />
        <Route path={ROUTES.SIGNUP} exact component={PAGES.SignupPage} />
        <Route
          path={ROUTES.USER_DETAILS}
          exact
          component={PAGES.UserDetailsPage}
        />
        <Route path={ROUTES.USERS} exact component={PAGES.UsersPage} />
        <Route
          path={`${ROUTES.USER}/:id`}
          exact
          component={PAGES.OtherUserPage}
        />
      </Switch>
    </div>
  )
}

export default App
