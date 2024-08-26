// Redux
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './app/store.ts'

// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// App
import App from './Kiosk.tsx'
import './index.css'

// Root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);


