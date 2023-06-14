import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { factApi } from './services/factApi'
import { persistReducer, persistStore } from 'redux-persist'
import factReducer from './slices/factSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  fact: factReducer,
  [factApi.reducerPath]: factApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(factApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
