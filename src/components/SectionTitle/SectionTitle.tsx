import React from 'react'

import './SectionTitle.css'

interface SectionTitleProps {
  title: string
}

const SectionTitle: React.FC<SectionTitleProps> = (
  props: SectionTitleProps
) => {
  return <div className="SectionTitle">{props.title}</div>
}

export default SectionTitle
