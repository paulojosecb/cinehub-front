import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import MoviesList from '../components/MoviesList'
import Movie from '../models/Movie'
import Serie from '../models/Serie'

import AuthService from '../services/AuthService'
import MovieService from '../services/MovieService'
import SerieService from '../services/SeriesService'

import * as ROUTES from '../constants/routes'
import SeriesService from '../services/SeriesService'
import SeriesList from '../components/SeriesList'

interface HomePageState {
  movies: Movie[]
  series: Serie[]
}

class HomePage extends React.Component<RouteComponentProps, HomePageState> {
  constructor(p: RouteComponentProps) {
    super(p)
    this.state = {
      movies: [],
      series: []
    }
  }

  handleAddClick = () => {
    const { history } = this.props
    history.push(ROUTES.INPUT)
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

      SeriesService.fetchSeries(user.id).then(series =>
        this.setState({ series })
      )
    }
  }

  render() {
    const { movies, series } = this.state
    return (
      <div className="App">
        <div>
          <div>
            <SectionTitle title="Meu acervo" />
            <button onClick={this.handleAddClick}>Adicionar</button>
          </div>
          <SectionTitle title="Filmes" />
          <MoviesList movies={movies} />
          <SectionTitle title="Séries" />
          <SeriesList series={series} />
        </div>
      </div>
    )
  }
}

export default withRouter(HomePage)
