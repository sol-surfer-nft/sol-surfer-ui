import React, { createContext, useState } from 'react'

const initialState = {
  isDarkMode: true
}

export const AppContext = createContext(initialState)

const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const value = { isDarkMode, setIsDarkMode }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
