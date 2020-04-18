import React from 'react'

// import LiveView from './Views/LiveView'
import subscriptionStore from './subscriptionStore'

// function App() {
//   const [events, setEvents] = React.useState([])

//   React.useEffect(() => {
//       subscriptionStore.initialise()
//   }, [])

//   const eventHandler = React.useCallback((event) => {
//     setEvents()
//   }, [setEvents])

//   return (
//     <LiveView />
//   )
// }

class App extends React.Component<{}, { events: any[] }> {

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
    console.log('handler')
    this.setState({
      events: [
        ...this.state.events,
        event,
      ]
    })
  }

  render () {
    return (
      <div>
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
