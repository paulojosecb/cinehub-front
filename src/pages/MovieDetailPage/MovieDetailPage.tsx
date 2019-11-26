import React, { SyntheticEvent, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Movie from '../../models/Movie'
import Format from '../../models/Format'
import Category from '../../models/Category'

import MovieService from '../../services/MovieService'
import FormatService from '../../services/FormatService'
import CategoryService from '../../services/CategoryService'
import AuthService from '../../services/AuthService'

import * as ROUTES from '../../constants/routes'
import Notifications, { notify } from 'react-notify-toast'

import './MovieDetailPage.css'

interface MovieDetailPageState {
  movie: Movie
  category: string
  format: string
  loading: boolean
  error: any
  loggedUserId: number
  type: string
  formats: Format[]
  categories: Category[]
}

type Params = {
  user_id: string
  id: string
}

class MovieDetailPage extends React.Component<
  RouteComponentProps<Params>,
  MovieDetailPageState
> {
  constructor(props: RouteComponentProps<Params>) {
    super(props)

    this.state = {
      movie: {},
      category: '',
      format: '',
      loading: false,
      error: null,
      loggedUserId: 0,
      type: 'idle',
      categories: [],
      formats: []
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props

    this.setState({ loading: true })

    const user = AuthService.getLoggedUser()

    if (user) {
      this.setState({ loggedUserId: user.id ? user.id : 0 })
    }

    FormatService.fetchFormats().then(formats => this.setState({ formats }))
    CategoryService.fetchCategories().then(categories =>
      this.setState({ categories })
    )

    MovieService.fetchMovie(parseInt(params.user_id), parseInt(params.id))
      .then(movie => {
        this.setState({ loading: false, movie })
        if (movie.format) {
          FormatService.fetchFormat(movie.format).then(format =>
            this.setState({
              format: format.description ? format.description : 'Indefinido'
            })
          )
        }

        if (movie.category) {
          CategoryService.fetchCategory(movie.category).then(category =>
            this.setState({
              category: category.description
                ? category.description
                : 'Indefinido'
            })
          )
        }
      })
      .catch(error => this.setState({ error }))
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const { movie } = this.state

    switch (target.name) {
      case 'title':
        movie.title = target.value
        break
      case 'year':
        movie.year = parseInt(target.value)
        break
      case 'duration':
        movie.duration = parseInt(target.value)
        break
      default:
        console.log('Error')
        break
    }

    this.setState({ movie: movie })
  }

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.name
    const { movie } = this.state
    switch (key) {
      case 'format':
        movie.format = parseInt(event.target.value)
        break
      case 'category':
        movie.category = parseInt(event.target.value)
        break
      default:
        console.log('Error')
        break
    }

    this.setState({ movie: movie })
  }

  handleEditButton = () => {
    const { type, movie } = this.state
    const {
      match: { params }
    } = this.props

    if (type == 'idle') {
      this.setState({ type: 'editing' })
    } else {
      MovieService.updateMovie(movie, parseInt(params.user_id)).then(
        updated => {
          notify.show('Atualizado', 'success')
        }
      )
      this.setState({ type: 'idle' })
    }
  }

  handleDeleteButton = () => {
    const {
      history,
      match: { params }
    } = this.props
    const { movie } = this.state

    if (movie) {
      MovieService.deleteMovie(movie, parseInt(params.user_id)).then(
        deleted => {
          console.log(deleted)
          history.push(`${ROUTES.HOME}/${params.user_id}`)
        }
      )
    }
  }

  render() {
    const {
      loading,
      error,
      movie,
      category,
      format,
      loggedUserId,
      type,
      formats,
      categories
    } = this.state
    const {
      match: { params }
    } = this.props

    return (
      <div className="MovieDetailPage">
        <Notifications />
        {error ? (
          'Ocorreu um erro'
        ) : loading ? (
          'Carregando'
        ) : (
          <div>
            <img src={`http://localhost:3000/${movie.photo}`} />
            <div className="MovieDetailPage_container">
              {type == 'idle' ? (
                <>
                  <p>Título: {movie.title ? movie.title : 'Indefinido'}</p>
                  <p>
                    Duração: {movie.duration ? movie.duration : 'Indefinido'}
                  </p>
                  <p>Ano: {movie.year ? movie.year : 'Indefinido'}</p>
                  <p>Categoria: {category ? category : 'Indefinido'}</p>
                  <p>Formato: {format ? format : 'Indefinido'}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="duration"
                    value={movie.duration}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="year"
                    value={movie.year}
                    onChange={this.handleInputChange}
                  />
                  <select
                    name="format"
                    value={movie.format}
                    onChange={this.handleSelectChange}
                  >
                    {formats.map(format => (
                      <option key={format.id} value={format.id}>
                        {format.description}
                      </option>
                    ))}
                  </select>
                  <select
                    name="category"
                    value={movie.category}
                    onChange={this.handleSelectChange}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.description}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {parseInt(params.user_id) === loggedUserId ? (
                <>
                  <button onClick={this.handleEditButton}>
                    {type == 'idle' ? 'Editar' : 'Salvar'}
                  </button>
                  <button onClick={this.handleDeleteButton}>Deletar</button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(MovieDetailPage)
