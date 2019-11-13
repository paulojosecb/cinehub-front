import Serie from '../models/Serie'

class SerieService {
  public url = `http://localhost:3000/series`

  public fetchSeries = async (user: number): Promise<[Serie]> => {
    const response = await fetch(`http://localhost:3000/users/${user}/series`)

    const series = this.jsonTo(await response.json())

    return series
  }

  public fetchSerie = async (user: number, id: number): Promise<Serie> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${id}`
    )

    const serieJSON = await response.json()

    const serie: Serie = {
      id: serieJSON.id,
      title: serieJSON.title,
      photo: serieJSON.photo,
      format: serieJSON.format_id,
      category: serieJSON.category_id
    }

    return serie
  }

  public createSerie = async (serie: Serie, user: number): Promise<Serie> => {
    const response = await fetch(`http://localhost:3000/users/${user}/series`, {
      method: 'POST',
      body: JSON.stringify(serie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const serieJSON = await response.json()

    const s: Serie = {
      id: serieJSON.id,
      title: serieJSON.title,
      photo: serieJSON.photo,
      owner: serieJSON.user_id,
      format: serieJSON.format_id,
      category: serieJSON.category_id
    }
    return s
  }

  public updateSerie = async (serie: Serie, user: number): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${serie.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(serie),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(await response.json())
    return true
  }

  public deleteSerie = async (serie: Serie, user: number): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${serie.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify(serie),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(await response.json())

    // const series = this.jsonTo(await response.json())
    return true
  }

  private jsonTo = (json: any): [Serie] => {
    const series = json.map((u: any) => {
      const serie: Serie = {
        id: u.id,
        title: u.title,
        photo: u.photo,
        owner: u.owner,
        format: u.format,
        category: u.category
      }
      return serie
    })

    return series
  }
}

export default new SerieService()
