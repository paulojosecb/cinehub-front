import React from 'react'
import { Switch, Route } from 'react-router-dom'

import * as ROUTES from './constants/routes'

import * as PAGES from './pages'

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={ROUTES.ADMIN} exact component={PAGES.AdminPage} />
        <Route path={ROUTES.DETAIL} exact component={PAGES.DetailPage} />
        <Route path={ROUTES.HOME} exact component={PAGES.HomePage} />
        <Route path={ROUTES.INPUT} exact component={PAGES.InputPage} />
        <Route path={ROUTES.LOGIN} exact component={PAGES.LoginPage} />
        <Route path={ROUTES.SIGNUP} exact component={PAGES.SignupPage} />
        <Route
          path={ROUTES.USER_DETAILS}
          exact
          component={PAGES.UserDetailsPage}
        />
        <Route path={ROUTES.USERS} exact component={PAGES.UsersPage} />
      </Switch>
    </div>
  )
}

export default App
