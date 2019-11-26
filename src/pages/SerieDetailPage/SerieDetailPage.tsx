import React, { ChangeEvent, SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import Serie from '../../models/Serie'
import Episode from '../../models/Episode'
import Format from '../../models/Format'
import Category from '../../models/Category'

import SectionTitle from '../../components/SectionTitle/SectionTitle'
import EpisodesList from '../../components/EpisodesList/EpisodesList'
import FormatService from '../../services/FormatService'
import CategoryService from '../../services/CategoryService'
import SeriesService from '../../services/SeriesService'
import EpisodeService from '../../services/EpisodeService'
import Notifications, { notify } from 'react-notify-toast'

import './SerieDetailPage.css'

interface SerieDetailPageState {
  serie: Serie
  episodes: Episode[]
  loading: boolean
  error: any
  type: string
  format: Format
  category: Category
  formats: Format[]
  categories: Category[]
  episodeName: string
  episodeDuration: string
}

type Params = {
  user_id: string
  id: string
}

class SerieDetailPage extends React.Component<
  RouteComponentProps<Params>,
  SerieDetailPageState
> {
  constructor(props: RouteComponentProps<Params>) {
    super(props)

    this.state = {
      serie: {},
      episodes: [],
      loading: false,
      error: null,
      type: 'idle',
      format: {},
      category: {},
      formats: [],
      categories: [],
      episodeName: '',
      episodeDuration: ''
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props
    FormatService.fetchFormats().then(formats => this.setState({ formats }))
    CategoryService.fetchCategories().then(categories =>
      this.setState({ categories })
    )

    this.setState({ loading: true })

    SeriesService.fetchSerie(
      parseInt(params.user_id),
      parseInt(params.id)
    ).then(serie => {
      this.setState({ serie, loading: false })
      if (serie.format) {
        FormatService.fetchFormat(serie.format).then(format => {
          this.setState({ format })
        })
      }

      if (serie.category) {
        CategoryService.fetchCategory(serie.category).then(category => {
          this.setState({ category })
        })
      }
    })

    EpisodeService.fetchEpisodes(
      parseInt(params.id),
      parseInt(params.user_id)
    ).then(episodes => {
      this.setState({ episodes })
    })
  }

  handleEditButton = () => {
    const { type } = this.state
    const {
      match: { params }
    } = this.props

    if (type == 'idle') {
      this.setState({ type: 'editing' })
    } else {
      const { serie } = this.state
      SeriesService.updateSerie(serie, parseInt(params.user_id)).then(
        updated => {
          notify.show('Atualizado', 'success')
        }
      )
      this.setState({ type: 'idle' })
    }
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const { serie } = this.state

    switch (target.name) {
      case 'title':
        serie.title = target.value
        break
      case 'episodeName':
        this.setState({ episodeName: target.value })
        break
      case 'episodeDuration':
        this.setState({ episodeDuration: target.value })
        break
      default:
        break
    }

    this.setState({ serie: serie })
  }

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.name
    const { serie } = this.state
    switch (key) {
      case 'format':
        serie.format = parseInt(event.target.value)
        break
      case 'category':
        serie.category = parseInt(event.target.value)
        break
      default:
        console.log('Error')
        break
    }

    this.setState({ serie: serie })
  }

  handleDeleteButton = () => {
    const {
      match: { params },
      history
    } = this.props
    const { serie } = this.state

    SeriesService.deleteSerie(serie, parseInt(params.user_id)).then(deleted => {
      history.push(`${ROUTES.HOME}/${params.user_id}`)
    })
  }

  handleEpisodeSubmit = () => {
    const { episodeName, episodeDuration, serie } = this.state
    const {
      match: { params }
    } = this.props
    const episode: Episode = {
      title: episodeName,
      duration: parseInt(episodeDuration),
      serie: serie.id
    }

    EpisodeService.createEpisode(
      episode,
      parseInt(params.id),
      parseInt(params.user_id)
    ).then(episode => {
      const { episodes } = this.state
      this.setState({ episodes: [...episodes, episode] })
    })
  }

  render() {
    const {
      loading,
      error,
      serie,
      episodes,
      type,
      format,
      category,
      formats,
      categories,
      episodeDuration,
      episodeName
    } = this.state
    return (
      <div className="SerieDetailPage">
        <Notifications />
        {error ? (
          'Ocorreu um erro'
        ) : loading ? (
          'Carregando'
        ) : (
          <div>
            <div>
              <img src={`http://localhost:3000/${serie.photo}`} />
              <div className="SerieDetailPage_container">
                {type == 'idle' ? (
                  <>
                    <p>Título:{serie.title ? serie.title : 'Indefinido'}</p>
                    <p>
                      Categoria:
                      {category.description
                        ? category.description
                        : 'Indefinido'}
                    </p>
                    <p>
                      Formato:
                      {format.description ? format.description : 'Indefinido'}
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={serie.title}
                      onChange={this.handleInputChange}
                    />
                    <select
                      name="format"
                      value={serie.format}
                      onChange={this.handleSelectChange}
                    >
                      {formats.map(format => {
                        return (
                          <option value={format.id} key={format.id}>
                            {format.description}
                          </option>
                        )
                      })}
                    </select>
                    <select
                      name="category"
                      value={serie.category}
                      onChange={this.handleSelectChange}
                    >
                      {categories.map(category => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.description}
                          </option>
                        )
                      })}
                    </select>
                  </>
                )}

                <button onClick={this.handleEditButton}>
                  {type == 'idle' ? 'Editar' : 'Salvar'}
                </button>
                <button onClick={this.handleDeleteButton}>Deletar</button>
              </div>
            </div>

            <div>
              <br />
              <br />
              <SectionTitle title="Episódios" />
              <br />
              <input
                name="episodeName"
                value={episodeName}
                placeholder="Nome do episódio"
                onChange={this.handleInputChange}
              />
              <input
                name="episodeDuration"
                value={episodeDuration}
                placeholder="Duração do episódio"
                onChange={this.handleInputChange}
              />
              <button onClick={this.handleEpisodeSubmit}>Adicionar</button>
              <br /> <br />
              <EpisodesList
                episodes={episodes}
                user_id={serie.owner ? serie.owner : 0}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(SerieDetailPage)
