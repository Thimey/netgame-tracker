import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Event, Player } from '../../types'

import EventFeed from '../../components/EventFeed'
import GameBoard from '../../components/GameBoard'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        border: '1px solid black',
        margin: '1px',
        padding: '30px',
    }
})

interface Props {
    players: Player[]
    events: Event[]
}

const LiveView: React.FC<Props> = ({ players, events }) => {
    const classes = useStyles({})

    const latestState = events[events.length - 1].room.state


    return (
        <div className={classes.container}>
            <EventFeed events={events}/>
            <GameBoard
                players={players}
                latestState={latestState}
            />
        </div>
    )
}

export default LiveView
