import Movie from '../models/Movie'

class MovieService {
  public url = `http://localhost:3000/movies`

  public fetchMovies = async (user: number): Promise<[Movie]> => {
    const response = await fetch(`http://localhost:3000/users/${user}/movies`)

    const movies = this.jsonTo(await response.json())
    return movies
  }

  public fetchMovie = async (user: number, id: number): Promise<Movie> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/movies/${id}`
    )

    const movieJSON = await response.json()

    const movie: Movie = {
      id: movieJSON[0].id,
      title: movieJSON[0].title,
      duration: movieJSON[0].duration,
      year: movieJSON[0].year,
      photo: movieJSON[0].photo,
      format: movieJSON[0].format_id,
      category: movieJSON[0].category_id
    }

    return movie
  }

  public createMovie = async (movie: Movie, user: number): Promise<Movie> => {
    const response = await fetch(`http://localhost:3000/users/${user}/movies`, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const movieJSON = await response.json()

    const m: Movie = {
      id: movieJSON.id,
      title: movieJSON.title,
      duration: movieJSON.duration,
      photo: movieJSON.photo,
      year: movieJSON.year,
      owner: movieJSON.user_id,
      format: movieJSON.format_id,
      category: movieJSON.category_id
    }
    return m
  }

  public updateMovie = async (movie: Movie, user: number): Promise<Movie> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/movies/${movie.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const movies = this.jsonTo(await response.json())
    return movies[0]
  }

  public deleteMovie = async (movie: Movie, user: number): Promise<boolean> => {
    console.log(movie)
    const response = await fetch(
      `http://localhost:3000/users/${user}/movies/${movie.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(await response.json())

    // const movies = this.jsonTo(await response.json())
    return true
  }

  private jsonTo = (json: any): [Movie] => {
    const movies = json.map((u: any) => {
      const movie: Movie = {
        id: u.id,
        title: u.title,
        duration: u.duration,
        photo: u.photo,
        year: u.year,
        owner: u.user_id,
        format: u.format_id,
        category: u.category_id
      }
      return movie
    })

    return movies
  }
}

export default new MovieService()
