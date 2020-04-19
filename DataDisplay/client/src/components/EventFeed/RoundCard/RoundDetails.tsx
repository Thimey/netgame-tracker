import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { CheckOutcomeEventState } from '../../../types'

import ScoreAndDeck from '../../GameBoard/ScoreAndDeck'

const useStyles = makeStyles({
    container: {

    },

})

interface Props {
    outcome: CheckOutcomeEventState
}

const RoundDetails: React.FC<Props> = ({ outcome: {
    num_enacted,
    refusals,
    last_enacted,
    president,
    chancellor,
    deck,
    removed,
} }) => {
    const classes = useStyles({})

    const roundNumber = num_enacted.fascist + num_enacted.liberal + 1

    return (
        <div className={classes.container}>
            <h2>{`Round ${roundNumber}`}</h2>
            <ScoreAndDeck score={num_enacted} deck={deck} removed={removed} refusals={refusals} />
            <span>{`President: ${president}`}</span>
            <span>{`Chancellor: ${chancellor}`}</span>
            <span>{`Outcome: ${last_enacted ? 'Liberal' : 'Fascist'}`}</span>
        </div>
    )
}

export default RoundDetails
