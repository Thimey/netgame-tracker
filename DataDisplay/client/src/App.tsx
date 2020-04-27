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

              <br />
              <Divider />
              <br />
              <br />

              <Card style={{ padding: '1rem' }}>
                <Typography>Release notes (27/04/2020): v0.2.0</Typography>

                <List>
                  <ListItem>
                    <Typography>Added previous game data load. Just type "/gameId" in the url</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Refreshing browser mid game should no longer lose the previous game states</Typography>
                  </ListItem>
                </List>
              </Card>
          </div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
)

export default App
