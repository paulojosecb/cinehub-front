import React, { ChangeEvent, SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

import Serie from '../models/Serie'
import Episode from '../models/Episode'
import Format from '../models/Format'
import Category from '../models/Category'

import SectionTitle from '../components/SectionTitle'
import EpisodesList from '../components/EpisodesList'
import FormatService from '../services/FormatService'
import CategoryService from '../services/CategoryService'
import SeriesService from '../services/SeriesService'
import Notifications, { notify } from 'react-notify-toast'

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
      categories: []
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
      default:
        console.log('Error')
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
      categories
    } = this.state
    return (
      <div className="App">
        <Notifications />
        {error ? (
          'Ocorreu um erro'
        ) : loading ? (
          'Carregando'
        ) : (
          <div>
            <div>
              <img src={serie.photo} />
              <div>
                {type == 'idle' ? (
                  <>
                    <p>{serie.title ? serie.title : 'Indefinido'}</p>
                    <p>
                      {category.description
                        ? category.description
                        : 'Indefinido'}
                    </p>
                    <p>
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

export default withRouter(SerieDetailPage)
