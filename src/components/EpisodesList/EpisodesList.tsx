import React from 'react'
import Notifications, { notify } from 'react-notify-toast'

import Episode from '../../models/Episode'

import './EpisodesList.css'

import EpisodeService from '../../services/EpisodeService'

interface EpisodesListProps {
  episodes: Episode[]
  user_id: number
}

const handleDelete = (episode: Episode, user_id: number): void => {
  EpisodeService.deleteEpisode(episode, user_id).then(deleted => {
    notify.show('Episódio deletado', 'success')
  })
}

const EpisodesList: React.FC<EpisodesListProps> = (
  props: EpisodesListProps
) => {
  return (
    <div>
      <Notifications />
      {props.episodes.map(episode => {
        return (
          <div key={episode.id} className="Episodes">
            <p>Título: {episode.title}</p>
            <p>Duração: {episode.duration}</p>
            <button onClick={(): void => handleDelete(episode, props.user_id)}>
              Deletar
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default EpisodesList
