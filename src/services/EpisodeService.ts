import Episode from '../models/Episode'

class EpisodeService {
  public url = `http://localhost:3000/episodes`

  public fetchEpisodes = async (): Promise<[Episode]> => {
    const response = await fetch(this.url)

    const episodes = this.jsonTo(await response.json())

    return episodes
  }

  public createEpisode = async (episode: Episode): Promise<Episode> => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(episode),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const episodes = this.jsonTo(await response.json())
    return episodes[0]
  }

  public updateEpisode = async (episode: Episode): Promise<Episode> => {
    const response = await fetch(`${this.url}/${episode.id}`, {
      method: 'PUT',
      body: JSON.stringify(episode),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const episodes = this.jsonTo(await response.json())
    return episodes[0]
  }

  public deleteEpisode = async (episode: Episode): Promise<Episode> => {
    const response = await fetch(`${this.url}/${episode.id}`, {
      method: 'DELETE',
      body: JSON.stringify(episode),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const episodes = this.jsonTo(await response.json())
    return episodes[0]
  }

  private jsonTo = (json: any): [Episode] => {
    const episodes = json.map((u: any) => {
      const episode: Episode = {
        id: u.id,
        title: u.title,
        duration: u.duration,
        serie: u.serie
      }
      return episode
    })

    return episodes
  }
}

export default new EpisodeService()
