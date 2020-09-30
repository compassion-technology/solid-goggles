import React, { useState } from 'react'
import { HOME, SUCCESS } from '../constants'

export const ViewContext = React.createContext(null)

export const ViewProvider = ({ children }) => {
  const state = useState(HOME)

  return (
    <ViewContext.Provider value={state}>
      {children}
    </ViewContext.Provider>
  )
}
