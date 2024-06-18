import { createContext, useContext, useReducer } from 'react'

const ShowContext = createContext(null)

const ShowDispatchContext = createContext(null)

export function ShowProvider({ children }) {
  const [show, dispatch] = useReducer(
    showReducer,
    initialShow
  )

  return (
    <ShowContext.Provider value={show}>
      <ShowDispatchContext.Provider value={dispatch}>
        {children}
      </ShowDispatchContext.Provider>
    </ShowContext.Provider>
  )
}

export function useShow() {
  return useContext(ShowContext)
}

export function useShowDispatch() {
  return useContext(ShowDispatchContext)
}

function showReducer(show, action) { // TODO add actions as needed
  switch (action.type) {
    case 'load': {
      return action.show;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialShow = null
