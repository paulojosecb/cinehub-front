import React, { ChangeEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

import Format from '../models/Format'
import Category from '../models/Category'
import Movie from '../models/Movie'
import Serie from '../models/Serie'

import FormatService from '../services/FormatService'
import CategoryService from '../services/CategoryService'
import MovieService from '../services/MovieService'
import AuthService from '../services/AuthService'

import * as ROUTES from '../constants/routes'
import SeriesService from '../services/SeriesService'

interface InputPageState {
  formats: Format[]
  categories: Category[]
  type: string
  title: string
  duration: string
  year: string
  format: number
  category: number
}

class InputPage extends React.Component<RouteComponentProps, InputPageState> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      formats: [],
      categories: [],
      type: 'movie',
      title: '',
      duration: '0',
      year: '2019',
      format: 1,
      category: 1
    }
  }

  componentDidMount() {
    FormatService.fetchFormats().then(formats => this.setState({ formats }))
    CategoryService.fetchCategories().then(categories =>
      this.setState({ categories })
    )
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name
    switch (key) {
      case 'title':
        this.setState({ title: e.target.value })
        break
      case 'duration':
        this.setState({ duration: e.target.value })
        break
      case 'year':
        this.setState({ year: e.target.value })
        break
      default:
        console.log('Error')
        break
    }
  }

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.name

    switch (key) {
      case 'format':
        this.setState({ format: parseInt(event.target.value) })
        break
      case 'category':
        this.setState({ category: parseInt(event.target.value) })
        break
      case 'type':
        this.setState({ type: event.target.value })
        break
      default:
        console.log('Error')
        break
    }
  }

  handleCancelButton = () => {
    const { history } = this.props
    history.push(ROUTES.HOME)
  }

  handleSendButton = () => {
    const { type, title, duration, year, format, category } = this.state
    const { history } = this.props
    const user = AuthService.getLoggedUser()

    switch (type) {
      case 'movie':
        const movie: Movie = {
          title: title,
          duration: parseInt(duration),
          year: parseInt(year),
          format: format,
          photo: 'a',
          category: category
        }

        if (user && user.id) {
          MovieService.createMovie(movie, user.id).then(movie => {
            console.log(movie)
            history.push(`${ROUTES.HOME}/${user.id}`)
          })
        }

        break
      case 'serie':
        const serie: Serie = {
          title: title,
          format: format,
          photo: 'aa',
          category: category
        }

        if (user && user.id) {
          SeriesService.createSerie(serie, user.id).then(serie => {
            console.log(serie)
            history.push(`${ROUTES.HOME}/${user.id}`)
          })
        }

        break
      default:
        console.log('Tipo inválido')
    }
  }

  render() {
    const {
      formats,
      categories,
      type,
      title,
      duration,
      year,
      format,
      category
    } = this.state

    return (
      <div className="App">
        <SectionTitle title="Adicionar" />

        <select name="type" value={type} onChange={this.handleSelectChange}>
          <option value="movie">Filme</option>
          <option value="serie">Série</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Título"
          onChange={this.handleInputChange}
          value={title}
        />
        <input type="file" name="image" />

        {type == 'movie' ? (
          <div>
            <input
              type="text"
              name="duration"
              placeholder="Duração"
              onChange={this.handleInputChange}
              value={duration}
            />
            <input
              type="text"
              name="year"
              placeholder="Ano"
              onChange={this.handleInputChange}
              value={year}
            />
          </div>
        ) : null}

        <select name="format" value={format} onChange={this.handleSelectChange}>
          {formats.map(format => {
            return (
              <option key={format.id} value={format.id}>
                {format.description}
              </option>
            )
          })}
        </select>
        <select
          name="category"
          value={category}
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

        <button onClick={this.handleCancelButton}>Cancelar</button>
        <button onClick={this.handleSendButton}>Adicionar</button>
      </div>
    )
  }
}

export default withRouter(InputPage)
