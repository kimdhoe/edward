import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { user } from './reducers/user'

export type AppState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  user,
})

export function initializeStore(preloadedState: AppState): Store {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}
