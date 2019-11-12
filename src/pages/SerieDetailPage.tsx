import React from 'react'
import Serie from '../models/Serie'
import Episode from '../models/Episode'
import SectionTitle from '../components/SectionTitle'
import EpisodesList from '../components/EpisodesList'

interface SerieDetailPageState {
  serie: Serie
  episodes: Episode[]
  loading: boolean
  error: any
}

class SerieDetailPage extends React.Component<SerieDetailPageState> {
  state: SerieDetailPageState = {
    serie: {},
    episodes: [],
    loading: false,
    error: {}
  }

  render() {
    const { loading, error, serie, episodes } = this.state
    return (
      <div className="App">
        {error ? (
          'Ocorreu um erro'
        ) : loading ? (
          'Carregando'
        ) : (
          <div>
            <div>
              <img src={serie.photo} />
              <div>
                <p>{serie.title ? serie.title : 'Indefinido'}</p>
                <p>{serie.category ? serie.category : 'Indefinido'}</p>
                <p>{serie.format ? serie.format : 'Indefinido'}</p>
                <button>Editar</button>
                <button>Deletar</button>
              </div>
            </div>

            <div>
              <SectionTitle title="Episódios" />
              <button>Adicionar</button>
              <EpisodesList episodes={episodes} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SerieDetailPage
