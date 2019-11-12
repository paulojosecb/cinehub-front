import React from 'react'

interface SectionTitleProps {
  title: string
}

const SectionTitle: React.FC<SectionTitleProps> = (
  props: SectionTitleProps
) => {
  return <div>{props.title}</div>
}

export default SectionTitle
