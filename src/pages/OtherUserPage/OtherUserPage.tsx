import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import MoviesList from '../../components/MoviesList/MoviesList'
import Movie from '../../models/Movie'

import UserService from '../../services/UserService'
import MovieService from '../../services/MovieService'
import User from '../../models/User'

import './OtherUserPage.css'
import SeriesService from '../../services/SeriesService'
import Serie from '../../models/Serie'
import SeriesList from '../../components/SeriesList/SeriesList'

interface OtherUserPageState {
  movies: Movie[]
  series: Serie[]
  user: User
}

type Params = {
  user_id: string
}

class OtherUserPage extends React.Component<
  RouteComponentProps<Params>,
  OtherUserPageState
> {
  constructor(p: RouteComponentProps<Params>) {
    super(p)
    this.state = {
      movies: [],
      series: [],
      user: {}
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props

    MovieService.fetchMovies(parseInt(params.user_id)).then(movies =>
      this.setState({ movies })
    )

    SeriesService.fetchSeries(parseInt(params.user_id)).then(series => {
      this.setState({ series })
    })

    UserService.fetchUser(parseInt(params.user_id)).then(user =>
      this.setState({ user })
    )
  }
  render() {
    const { movies, user, series } = this.state
    return (
      <div className="OtherUserPage">
        <div>
          <div>
            <SectionTitle
              title={`Acervo de ${user.name ? user.name : 'Carregando'}`}
            />
          </div>
          <br />
          <SectionTitle title="Filmes" />
          <MoviesList movies={movies} />
          <br /> <br />
          <SectionTitle title="Series" />
          <SeriesList series={series} />
        </div>
      </div>
    )
  }
}

export default OtherUserPage
