'use client';

import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

interface NavContextType {
    sideNav: boolean
    setSideNav: React.Dispatch<React.SetStateAction<boolean>>
    handleSideNav: () => void
  }

// Create a new context
const NavContext = createContext<NavContextType>({
  sideNav: false,
  setSideNav: () => {},
  handleSideNav: () => {},
})

// Create a custom hook to use the context
export const useNavContext = () => {
  return useContext(NavContext)
}

// Create a provider component
export const NavContextProvider = ({ children }: PropsWithChildren) => {
  const [sideNav, setSideNav] = useState(false)

  function handleSideNav() {
    setSideNav((prev) => !prev)
  }

  const value: NavContextType = {
    sideNav,
    setSideNav,
    handleSideNav,
  }

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  )
}
