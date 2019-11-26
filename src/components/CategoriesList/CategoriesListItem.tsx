import React, { Component, SyntheticEvent } from 'react'
import Notifications, { notify } from 'react-notify-toast'

import Category from '../../models/Category'
import CategoryService from '../../services/CategoryService'

interface State {
  type: string
  category: Category
}

interface Props {
  category: Category
  onUpdate: any
}

export default class FormatsListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'idle',
      category: props.category
    }
  }

  handleEditButton = () => {
    const { type, category } = this.state
    const { onUpdate } = this.props

    if (type == 'idle') {
      this.setState({ type: 'editing' })
    } else {
      CategoryService.updateCategory(category).then(updated => {
        notify.show('Categoria atualizada', 'success')
        onUpdate()
      })
      this.setState({ type: 'idle' })
    }
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const { category } = this.state

    category.description = target.value
    this.setState({ category: category })
  }

  handleDeleteButton = () => {
    const { category } = this.state
    const { onUpdate } = this.props

    CategoryService.deleteCategory(category).then(deleted => {
      notify.show('Categoria deletada', 'success')
      onUpdate()
    })
  }

  render() {
    const { category, type } = this.state
    return (
      <div>
        <Notifications />
        {type == 'idle' ? (
          <p>{category.description}</p>
        ) : (
          <input
            type="text"
            value={category.description}
            onChange={this.handleInputChange}
          />
        )}
        <button onClick={this.handleEditButton}>
          {type == 'idle' ? 'Editar' : 'Salvar'}
        </button>
        <button onClick={this.handleDeleteButton}>Deletar</button>
      </div>
    )
  }
}
