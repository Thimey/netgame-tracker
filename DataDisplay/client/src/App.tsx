import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Header from './components/Header'
import LiveView from './Views/LiveView'

const hitsTheme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

const App: React.FC = () => (
  <ThemeProvider theme={hitsTheme}>
    <Header />
    <Router>
      <Switch>
        <Route path='/:gameId'>
          <LiveView />
        </Route>
        <Route path='/' exact>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '16px' }}>
              <Typography color='textPrimary' variant='h3'>Waiting for game to start...</Typography>
              <Typography color='textSecondary'>Ensure only ONE person is recording game.</Typography>
              <br/>
              <Typography color='textSecondary'>TODO: Load previous game state; currently refresh will purge past events</Typography>
          </div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
)

export default App
