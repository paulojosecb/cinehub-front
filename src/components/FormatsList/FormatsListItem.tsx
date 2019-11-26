import React, { Component, SyntheticEvent } from 'react'

import Format from '../../models/Format'
import FormatService from '../../services/FormatService'
import Notifications, { notify } from 'react-notify-toast'

interface FormatsListItemState {
  type: string
  format: Format
}

interface FormatsListItemProps {
  format: Format
  onUpdate: any
}

export default class FormatsListItem extends React.Component<
  FormatsListItemProps,
  FormatsListItemState
> {
  constructor(props: FormatsListItemProps) {
    super(props)

    this.state = {
      type: 'idle',
      format: props.format
    }
  }

  handleEditButton = () => {
    const { type, format } = this.state
    const { onUpdate } = this.props

    if (type == 'idle') {
      this.setState({ type: 'editing' })
    } else {
      FormatService.updateFormat(format).then(updated => {
        notify.show('Formato atualizado', 'success')
        onUpdate()
      })
      this.setState({ type: 'idle' })
    }
  }

  handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const { format } = this.state

    format.description = target.value
    this.setState({ format: format })
  }

  handleDeleteButton = () => {
    const { format } = this.state
    const { onUpdate } = this.props

    FormatService.deleteFormat(format).then(deleted => {
      notify.show('Formato deletado', 'success')
      onUpdate()
    })
  }

  render() {
    const { format, type } = this.state
    return (
      <div>
        <Notifications />
        {type == 'idle' ? (
          <p>{format.description}</p>
        ) : (
          <input
            type="text"
            value={format.description}
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
