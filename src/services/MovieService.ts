import Movie from '../models/Movie'

class MovieService {
  public url = `http://localhost:3000/movies`

  public fetchMovies = async (): Promise<[Movie]> => {
    const response = await fetch(this.url)

    const movies = this.jsonTo(await response.json())

    return movies
  }

  public createMovie = async (movie: Movie): Promise<Movie> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const movies = this.jsonTo(await response.json())
    return movies[0]
  }

  public updateMovie = async (movie: Movie): Promise<Movie> => {
    const response = await fetch(`${this.url}/${movie.id}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const movies = this.jsonTo(await response.json())
    return movies[0]
  }

  public deleteMovie = async (movie: Movie): Promise<Movie> => {
    const response = await fetch(`${this.url}/${movie.id}`, {
      method: 'DELETE',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const movies = this.jsonTo(await response.json())
    return movies[0]
  }

  private jsonTo = (json: any): [Movie] => {
    const movies = json.map((u: any) => {
      const movie: Movie = {
        id: u.id,
        title: u.title,
        duration: u.duration,
        photo: u.photo,
        year: u.year,
        owner: u.owner,
        format: u.format,
        category: u.category
      }
      return movie
    })

    return movies
  }
}

export default new MovieService()
