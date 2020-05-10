import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'

import Header from './components/Header'
import LiveView from './Views/LiveView'
import GameList from './Views/GameList'

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
              <Typography color='textSecondary'>Ensure only ONE person is recording game.</Typography>
              <Typography color='textSecondary'>Type "/gameId" in url to view game</Typography>
              <Typography color='textSecondary'>
                <a href='https://meet.jit.si/YeaTheLahdsPokerAndHits' target='_blank'>Chat</a>
              </Typography>

              <br />
              <Divider />
              <br />

              <GameList />
          </div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
)

export default App
