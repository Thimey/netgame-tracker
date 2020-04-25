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

    const releventEvents = states.filter(
        state => state.phase === 'secondLastVoteWithChancellor' || state.phase === 'failedVote' || state.phase === 'missionOutcome'
    )

    const getRounds = (states: EventState[]) => {
        let isNewRound = true
        const rounds: Round[] = [[]]

        states.forEach((state) => {
            if (state.phase !== 'missionOutcome') {
                if (isNewRound) {
                    rounds.push([state])
                } else {
                    rounds[rounds.length - 1].push(state)
                }

                isNewRound = false
            } else {
                // is a missionOutcome = end of round
                rounds[rounds.length - 1].push(state)

                isNewRound = true
            }
        })

        return rounds
    }

    console.log('rounds', getRounds(releventEvents))

    return (
        <div className={classes.container}>
            {
                getRounds(releventEvents).map(round => (
                    <RoundCard round={round} />
                ))
            }
        </div>
    )
}

export default EventFeed
