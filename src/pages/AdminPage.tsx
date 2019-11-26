import React, { SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import SectionTitle from '../components/SectionTitle/SectionTitle'
import FormatsList from '../components/FormatsList/FormatsList'
import CategoriesList from '../components/CategoriesList/CategoriesList'

import Format from '../models/Format'
import Category from '../models/Category'

import FormatService from '../services/FormatService'
import CategoryService from '../services/CategoryService'
import AuthService from '../services/AuthService'

import * as ROUTES from '../constants/routes'

interface State {
  formats: Format[]
  categories: Category[]
  newFormat: string
  newCategory: string
}

class AdminPage extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      categories: [],
      formats: [],
      newFormat: '',
      newCategory: ''
    }
  }

  componentDidMount() {
    const { history } = this.props
    FormatService.fetchFormats().then(formats => this.setState({ formats }))
    CategoryService.fetchCategories().then(categories =>
      this.setState({ categories })
    )

    if (!AuthService.getLoggedUser()) {
      history.push(ROUTES.LOGIN)
    }

    if (AuthService.getLoggedUserRole() === 'user') {
      const user = AuthService.getLoggedUser()
      if (user) {
        history.push(`${ROUTES.HOME}/${user.id}`)
      }
    }
  }

  fetchFormats = () => {
    FormatService.fetchFormats().then(formats => this.setState({ formats }))
  }

  fetchCategories = () => {
    CategoryService.fetchCategories().then(categories =>
      this.setState({ categories })
    )
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement

    switch (target.name) {
      case 'newFormat':
        this.setState({ newFormat: target.value })
        break
      case 'newCategory':
        this.setState({ newCategory: target.value })
        break
      default:
        console.log('Error')
        break
    }
  }

  handleFormatSubmit = () => {
    const { newFormat } = this.state

    FormatService.createFormat(newFormat).then(format => {
      this.fetchFormats()
    })
  }

  handleCategorySubmit = () => {
    const { newCategory } = this.state

    CategoryService.createCategory(newCategory).then(category => {
      this.fetchCategories()
    })
  }

  render() {
    const { categories, formats, newCategory, newFormat } = this.state
    return (
      <div className="App">
        Admin
        <br />
        <br />
        <SectionTitle title="Formatos" />
        <div>
          <p>Novo formato</p>
          <input
            type="text"
            placeholder="Nome do Formato"
            name="newFormat"
            value={newFormat}
            onChange={this.handleInputChange}
          />
          <button
            disabled={newFormat == '' ? true : false}
            onClick={this.handleFormatSubmit}
          >
            Adicionar
          </button>
        </div>
        <br />
        <FormatsList formats={formats} onUpdate={this.fetchFormats} />
        <br />
        <br />
        <br />
        <SectionTitle title="Categorias" />
        <div>
          <p>Nova categoria</p>
          <input
            type="text"
            placeholder="Nome da Categoria"
            name="newCategory"
            value={newCategory}
            onChange={this.handleInputChange}
          />
          <button
            disabled={newCategory == '' ? true : false}
            onClick={this.handleCategorySubmit}
          >
            Adicionar
          </button>
        </div>
        <br />
        <CategoriesList
          categories={categories}
          onUpdate={this.fetchCategories}
        />
      </div>
    )
  }
}

export default withRouter(AdminPage)
