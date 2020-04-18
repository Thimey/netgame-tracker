import React from 'react'

import LiveView from './Views/LiveView'
import subscriptionStore from './subscriptionStore'

function App() {
  React.useEffect(() => {
      subscriptionStore.initialise()
  }, [])


  return (
    <LiveView />
  )
}

export default App
