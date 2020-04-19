import React from 'react'

import playerStore from './playerStore'

import { GameState, GameEvent, Player } from './types'

import LiveView from './Views/LiveView'
import subscriptionStore from './subscriptionStore'

class App extends React.Component<{}, GameState> {

  constructor(props: any) {
    super(props)
    this.state = {
      events: []
    }


  }

  players: Player[] = []

  componentDidMount() {

    subscriptionStore.initialise()

    subscriptionStore.subscribe('hitsEvent', this.eventHandler)
  }

  eventHandler = (event: any) => {
    console.log('handler')

    const gameEvent: GameEvent = JSON.parse(event)

    if (this.players.length === 0) {
      playerStore.addPlayers(gameEvent.room.players)
    }

    this.setState((prevState)=> ({
      events: [
        ...prevState.events,
        gameEvent,
      ]
    }))
  }

  render () {

    return (
      <div>
        {
          this.state.events.length > 0
            ? (
              <LiveView events={this.state.events}/>
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
