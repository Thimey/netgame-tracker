import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'


import playerStore from '../../playerStore'
import { GameEvent } from '../../types'

import EventFeed from '../../components/EventFeed'
import GameBoard from '../../components/GameBoard'


const useStyles = makeStyles(theme => ({
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

}))

interface Props {
    events: GameEvent[]
}

const LiveView: React.FC<Props> = ({ events }) => {
    const classes = useStyles({})

    const states = events.map(event => event.state)
    const latestState = events[events.length - 1].state

    playerStore.addPlayers(events[0].players)


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

export default LiveView
