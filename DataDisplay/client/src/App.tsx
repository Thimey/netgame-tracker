import React from 'react'

import { GameState, GameEvent, Player } from './types'

import playerStore from './playerStore'
import LiveView from './Views/LiveView'
import subscriptionStore, { isConnectionChangeEvent } from './subscriptionStore'

// import { events } from './testEvents'

class App extends React.Component<{}, GameState> {

  constructor(props: any) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    subscriptionStore.initialise()

    subscriptionStore.subscribe('hitsEvent', this.eventHandler)
  }

  eventHandler = (event: any) => {
    console.log('event', event)
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

    console.log(this.state.events)

    return (
      <div>
        {
          this.state.events.length > 0
            ? (
              <LiveView events={this.state.events} />
            )
            : (
              <h1>Waiting for game to start</h1>
            )
        }
      </div>
    )
  }
}

export default App
