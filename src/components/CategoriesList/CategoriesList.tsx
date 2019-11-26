import React from 'react'

import Category from '../../models/Category'
import CategoriesListItem from './CategoriesListItem'

interface Props {
  categories: Category[]
  onUpdate: any
}

const FormatsList = (props: Props) => {
  return (
    <div>
      {props.categories.map(categoriy => {
        return (
          <CategoriesListItem
            key={categoriy.id}
            category={categoriy}
            onUpdate={props.onUpdate}
          />
        )
      })}
    </div>
  )
}

export default FormatsList
