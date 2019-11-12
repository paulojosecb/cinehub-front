import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import MoviesList from '../components/MoviesList'
import Movie from '../models/Movie'

import AuthService from '../services/AuthService'
import MovieService from '../services/MovieService'

import * as ROUTES from '../constants/routes'

interface HomePageState {
  movies: Movie[]
}

class HomePage extends React.Component<RouteComponentProps, HomePageState> {
  constructor(p: RouteComponentProps) {
    super(p)
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    const { history } = this.props
    const user = AuthService.getLoggedUser()

    if (!user || !user.id) {
      history.push(ROUTES.LOGIN)
    } else {
      MovieService.fetchMovies(user.id).then(movies =>
        this.setState({ movies })
      )
    }
  }

  render() {
    const { movies } = this.state
    return (
      <div className="App">
        <div>
          <div>
            <SectionTitle title="Meu acervo" />
            <p>Adicionar</p>
          </div>
          <MoviesList movies={movies} />
        </div>
      </div>
    )
  }
}

export default withRouter(HomePage)
