import Serie from '../models/Serie'

class SerieService {
  public url = `http://localhost:3000/series`

  public fetchSeries = async (): Promise<[Serie]> => {
    const response = await fetch(this.url)

    const series = this.jsonTo(await response.json())

    return series
  }

  public createSerie = async (serie: Serie): Promise<Serie> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(serie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const series = this.jsonTo(await response.json())
    return series[0]
  }

  public updateSerie = async (serie: Serie): Promise<Serie> => {
    const response = await fetch(`${this.url}/${serie.id}`, {
      method: 'PUT',
      body: JSON.stringify(serie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const series = this.jsonTo(await response.json())
    return series[0]
  }

  public deleteSerie = async (serie: Serie): Promise<Serie> => {
    const response = await fetch(`${this.url}/${serie.id}`, {
      method: 'DELETE',
      body: JSON.stringify(serie),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const series = this.jsonTo(await response.json())
    return series[0]
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
