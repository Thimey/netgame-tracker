import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { EventState, isCheckOutcomeState, Round } from '../../types'

import RoundCard from './RoundCard'


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
    states: EventState[]
}


const EventFeed: React.FC<Props> = ({ states }) => {
    const classes = useStyles({})

    const checkOutcomeAndVoteEvents = states.filter(
        state => state.phase === 'check_outcome' || state.phase === 'vote'
    )

    const getRounds = (states: EventState[]) => {
        let voteCount = 0
        const rounds: Round[] = []

        states.forEach((state, index) => {
            if (!isCheckOutcomeState(state)) {
                voteCount += 1

                return
            }

            rounds.push({
                outcome: state,
                votes: [...states.slice(index - voteCount, index)]
            })

            voteCount = 0
        })

        return rounds
    }

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
