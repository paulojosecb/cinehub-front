import React from 'react'
import SectionTitle from '../components/SectionTitle'
import MoviesList from '../components/MoviesList'
import Movie from '../models/Movie'

interface OtherUserPageState {
  movies: Movie[]
}

class OtherUserPage extends React.Component<{}, OtherUserPageState> {
  constructor(p: {}) {
    super(p)
    this.state = {
      movies: []
    }
  }
  render() {
    const { movies } = this.state
    return (
      <div className="App">
        <div>
          <div>
            <SectionTitle title="Acervo de Fulano" />
          </div>
          <MoviesList movies={movies} />
        </div>
      </div>
    )
  }
}

export default OtherUserPage
