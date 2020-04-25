import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { EventState, Round } from '../../../types'
import playerStore from '../../../playerStore'

import ScoreAndDeck from '../../GameBoard/ScoreAndDeck'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        flex: 1,
        borderLeft: '1px solid black',
    },
    voteDetails: {
        display: 'flex',
        flexDirection: 'column',
    }

})

interface Props {
    round: Round
}

const RoundDetails: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    const getRoundDetails = () => {
        const lastEvent = round && round[round.length - 1]
        const hasOutcome = lastEvent && lastEvent.phase === 'missionOutcome'

        if (hasOutcome) {
            const {
                num_enacted,
                refusals,
                last_enacted,
                president,
                chancellor,
                deck,
                removed,
            } = lastEvent
    
            return (
                <div>
                    <ScoreAndDeck score={num_enacted} deck={deck} removed={removed} refusals={refusals} />
                    <div className={classes.voteDetails}>
                        <span>{`President: ${playerStore.getPlayerByIndex(president)}`}</span>
                        <span>{`Chancellor: ${chancellor ? playerStore.getPlayerById(chancellor) : '-'}`}</span>
                    </div>
                    <span>{`Outcome: ${last_enacted ? 'Liberal' : 'Fascist'}`}</span>
                </div>
            )
        }

        return (
            <div>
                round incomplete
            </div>
        )
    
    }

    const roundNumber = round[0].num_enacted.fascist + round[0].num_enacted.liberal + 1

    return (
        <div className={classes.container}>
            <h4>{`Round ${roundNumber}`}</h4>
            {getRoundDetails()}
        </div>
    )
}

export default RoundDetails
