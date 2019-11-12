import Serie from '../models/Serie'

class SerieService {
  public url = `http://localhost:3000/series`

  public fetchSeries = async (): Promise<[Serie]> => {
    const response = await fetch(this.url)

    const movies = this.jsonTo(await response.json())

    return movies
  }

  public createSerie = async (movie: Serie): Promise<Serie> => {
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

  public updateSerie = async (movie: Serie): Promise<Serie> => {
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

  public deleteSerie = async (movie: Serie): Promise<Serie> => {
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

  private jsonTo = (json: any): [Serie] => {
    const movies = json.map((u: any) => {
      const movie: Serie = {
        id: u.id,
        title: u.title,
        photo: u.photo,
        owner: u.owner,
        format: u.format,
        category: u.category
      }
      return movie
    })

    return movies
  }
}

export default new SerieService()
