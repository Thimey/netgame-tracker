import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import { GameState } from './types'

import Header from './components/Header'
import playerStore from './playerStore'
import LiveView from './Views/LiveView'
import subscriptionStore, { isConnectionChangeEvent } from './subscriptionStore'

// import { events } from './testEvents'

const hitsTheme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

class App extends React.Component<{}, GameState> {

  constructor(props: any) {
    super(props)
    this.state = {
      // events: events.map(e => e.data)
      events: [],
    }
  }

  componentDidMount() {
    subscriptionStore.initialise()

    subscriptionStore.subscribe('hitsEvent', this.eventHandler)
  }

  eventHandler = (event: any) => {
    if (isConnectionChangeEvent(event)) {
      return
    }

    const { data } = event

    if (!data) {
      return
    }

    if (data && data.players && playerStore.players.length === 0) {
      playerStore.addPlayers(data.players)
    }

    this.setState((prevState)=> ({
      events: [
        ...prevState.events,
        data,
      ]
    }))
  }

  render () {
    return (
      <ThemeProvider theme={hitsTheme}>
        <Header />
        {
          this.state.events.length > 0
            ? (
              <LiveView events={this.state.events} />
            )
            : (
              <div style={{ display: 'flex', flexDirection: 'column', margin: '16px' }}>
                  <Typography color='textPrimary' variant='h3'>Waiting for game to start...</Typography>
                  <Typography color='textSecondary'>Ensure only ONE person is recording game.</Typography>
                  <br/>
                  <Typography color='textSecondary'>TODO: Load previous game state; currently refresh will purge past events</Typography>
              </div>
            )
        }
      </ThemeProvider>
    )
  }
}

export default App
