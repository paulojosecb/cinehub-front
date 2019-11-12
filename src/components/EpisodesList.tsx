import React from 'react'
import Episode from '../models/Episode'

interface EpisodesListProps {
  episodes: Episode[]
}

const EpisodesList: React.FC<EpisodesListProps> = (
  props: EpisodesListProps
) => {
  return (
    <div>
      {props.episodes.map(episode => {
        return (
          <div key={episode.id}>
            <p>{episode.title}</p>
            <p>{episode.duration}</p>
          </div>
        )
      })}
    </div>
  )
}

export default EpisodesList
