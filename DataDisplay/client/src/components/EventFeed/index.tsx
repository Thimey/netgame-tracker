import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { EventState, Round } from '../../types'

import RoundCard from './RoundCard'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        '& > *': {
            marginBottom: '1rem',
        },
    }
})

interface Props {
    states: EventState[]
}


const EventFeed: React.FC<Props> = ({ states }) => {
    const classes = useStyles({})

    const checkOutcomeAndVoteEvents = states.filter(
        state => state.phase === 'failedVote' || state.phase === 'missionOutcome'
    )

    const getRounds = (states: EventState[]) => {
        let voteCount = 0
        const rounds: Round[] = []

        states.forEach((state, index) => {
            if (state.phase !== 'missionOutcome') {
                voteCount += 1

                return
            }

            // is a missionOutcome = end of round
            rounds.push([...states.slice(index - voteCount, index + 1)])

            voteCount = 0
        })

        return rounds
    }

    console.log('rounds', getRounds(checkOutcomeAndVoteEvents))

    return (
        <div className={classes.container}>
            {
                getRounds(checkOutcomeAndVoteEvents).map(round => (
                    <RoundCard round={round} />
                ))
            }
        </div>
    )
}

export default EventFeed
