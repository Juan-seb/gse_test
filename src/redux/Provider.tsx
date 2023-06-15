import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Provider store={store}>
      {/* The <PersistGate> component delays rendering of the child components until the persisted state has been retrieved and rehydrated */}
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
