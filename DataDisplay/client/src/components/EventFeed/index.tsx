import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Event, isCheckOutcomeEvent } from '../../types'

import RoundCard from './RoundCard'
import SpecialEventCard from './SpecialEventCard'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '70%',
        border: '1px solid black',
        padding: '4px',
    }
})

interface Props {
    events: Event[]
}

interface Round {
    votes: Event[]
    outcome: Event
}

const EventFeed: React.FC<Props> = ({ events }) => {
    const classes = useStyles({})

    const checkOutcomeAndVoteEvents = events.filter(
        event => event.room.state.phase === 'check_outcome' || event.room.state.phase === 'vote'
    )

    const getGroupedEvents = (events: Event[]) => {
        events.reduce((rounds, event) => {
            const { room: { state } } = event

            if (!isCheckOutcomeEvent(state)) {

            }

        })
    }

    return (
        <div className={classes.container}>
            {/* <RoundCard />
            <SpecialEventCard />
            <RoundCard />
            <RoundCard /> */}
        </div>
    )
}

export default EventFeed
