import React from 'react'

import Format from '../../models/Format'
import FormatsListItem from './FormatsListItem'

interface FormatsListProps {
  formats: Format[]
  onUpdate: any
}

const FormatsList = (props: FormatsListProps) => {
  return (
    <div>
      {props.formats.map(format => {
        return (
          <FormatsListItem
            key={format.id}
            format={format}
            onUpdate={props.onUpdate}
          />
        )
      })}
    </div>
  )
}

export default FormatsList
