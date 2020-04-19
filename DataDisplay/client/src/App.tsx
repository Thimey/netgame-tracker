import React from 'react'

import { GameState, Event, Player } from './types'

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

    const gameEvent: Event = JSON.parse(event)

    if (this.players.length === 0) {
      this.players = gameEvent.room.players
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
        <LiveView players={this.players} events={this.state.events}/>

        {
          this.state.events.map(e => (
            <p>
              {`${JSON.stringify(e, undefined, 4).substr(0, 20)}....`}
            </p>
          ))
        }
      </div>
    )
  }
}

export default App
