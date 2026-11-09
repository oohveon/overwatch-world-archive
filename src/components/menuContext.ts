import { createContext, useContext } from 'react'

export const MenuContext = createContext<{ open: () => void }>({ open: () => {} })

export const useMenu = () => useContext(MenuContext)
