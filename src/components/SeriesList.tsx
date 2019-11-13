import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Serie from '../models/Movie'

import * as ROUTES from '../constants/routes'

interface SeriesListProps {
  series: Serie[]
}

const handleClick = (props: any, id: number) => {
  const {
    match: { params },
    history
  } = props
  history.push(`${ROUTES.USER}/${params.user_id}${ROUTES.SERIE_DETAIL}/${id}`)
}

const SeriesList: React.FC<SeriesListProps & RouteComponentProps> = (
  props: SeriesListProps
) => {
  return (
    <div>
      {props.series.map(serie => {
        return (
          <div
            key={serie.id}
            onClick={() => handleClick(props, serie.id ? serie.id : 1)}
          >
            <img src={serie.photo} />
            <div>{serie.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(SeriesList)
