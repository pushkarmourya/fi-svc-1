import React from 'react'
import './styles.css' 
import { strings } from '../../constants/Strings'

const EmptyState = () => {
  return (
    <div className="empty-state">
      <p>{strings.emptyText}</p>
    </div>
  )
}

export default EmptyState
