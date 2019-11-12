import React from 'react'
import Movie from '../models/Movie'

interface MovieDetailPageState {
  movie: Movie
  loading: boolean
  error: any
}

class MovieDetailPage extends React.Component<MovieDetailPageState> {
  state: MovieDetailPageState = {
    movie: {},
    loading: false,
    error: {}
  }

  render() {
    const { loading, error, movie } = this.state
    return (
      <div className="App">
        {error ? (
          'Ocorreu um erro'
        ) : loading ? (
          'Carregando'
        ) : (
          <div>
            <img src={movie.photo} />
            <div>
              <p>{movie.title ? movie.title : 'Indefinido'}</p>
              <p>{movie.duration ? movie.duration : 'Indefinido'}</p>
              <p>{movie.year ? movie.year : 'Indefinido'}</p>
              <p>{movie.category ? movie.category : 'Indefinido'}</p>
              <p>{movie.format ? movie.format : 'Indefinido'}</p>
              <button>Editar</button>
              <button>Deletar</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MovieDetailPage
