import Episode from '../models/Episode'

class EpisodeService {
  public url = `http://localhost:3000/episodes`

  public fetchEpisodes = async (
    serie: number,
    user: number
  ): Promise<[Episode]> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${serie}/episodes`
    )

    const episodes = this.jsonTo(await response.json())
    return episodes
  }

  public createEpisode = async (
    episode: Episode,
    serie: number,
    user: number
  ): Promise<Episode> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${serie}/episodes`,
      {
        method: 'POST',
        body: JSON.stringify(episode),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const episodeJSON = await response.json()

    const ep: Episode = {
      id: episodeJSON.id,
      title: episodeJSON.title,
      duration: episodeJSON.duration,
      serie: episodeJSON.serie
    }

    return ep
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

  public deleteEpisode = async (
    episode: Episode,
    user: number
  ): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/users/${user}/series/${episode.serie}/episodes/${episode.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify(episode),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // const episodes = this.jsonTo(await response.json())
    return true
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
