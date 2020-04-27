import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import subscriptionStore, { isConnectionChangeEvent } from '../../subscriptionStore'

import playerStore from '../../playerStore'
import { GameState } from '../../types'

import EventFeed from '../../components/EventFeed'
import GameBoard from '../../components/GameBoard'

import { events } from '../../testEvents'


const styles = (theme: any) => createStyles({
    container: {
        padding: '1rem',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            '& > :last-child': {
                paddingLeft: '1rem',
            },
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            '& > :last-child': {
                marginBottom: '1rem',
            },
        },
    }

})

interface ParamProps {
    gameId: string
}

interface Props extends WithStyles, RouteComponentProps<ParamProps> {}

class LiveView extends React.Component<Props, GameState> {

    constructor(props: any) {
        super(props)
        this.state = {
          events: events.map(e => e.data)
        //   events: [],
        }
      }
    
      componentDidMount() {
        subscriptionStore.initialise()
    
        subscriptionStore.subscribe('hitsEvent', this.eventHandler)

        const { gameId } = this.props.match.params

        console.log('gameId: ', gameId)
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
        const { events } = this.state
        const { classes } = this.props

        const states = events.map(event => event.state)
        const latestState = events[events.length - 1].state

        playerStore.addPlayers(events[0].players)
        playerStore.setCurrentPresident(latestState.president)

        return (
            <Grid className={classes.container}>
                <Grid item xs={12} md={9}>
                    <EventFeed states={states}/>
                </Grid>
    
                <Grid item xs={12} md={3}>
                    <GameBoard latestState={latestState} />
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(withStyles(styles)(LiveView))
