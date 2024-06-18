import { createContext, useContext, useReducer } from 'react'

const TabContext = createContext(null)

const TabDispatchContext = createContext(null)

export function TabProvider({ children }) {
  const [show, dispatch] = useReducer(
    tabReducer,
    {
      type: 'none',
      active: 0
    }
  )

  return (
    <TabContext.Provider value={show}>
      <TabDispatchContext.Provider value={dispatch}>
        {children}
      </TabDispatchContext.Provider>
    </TabContext.Provider>
  )
}

export function useTab() {
  return useContext(TabContext)
}

export function useTabDispatch() {
  return useContext(TabDispatchContext)
}

// action
//  type: open, highlight
//  active: 0
//  highlight: cast, etc
function tabReducer(tab, action) {
  return action
}
