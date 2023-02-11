import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { listReducer } from './reducers'
import * as actions from './actions'


const rootReducer = combineReducers({
  list: listReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware())
)

type InferValuesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes = ReturnType<InferValuesTypes<typeof actions>>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

