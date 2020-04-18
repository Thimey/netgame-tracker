import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Score as ScoreType, Deck as DeckType } from '../../../types'

import Deck from './Deck'
import Score from './ScoreBoard'
import Refusals from './Refusals'

const useStyles = makeStyles({
    container: {
        display: 'flex',
    },
    deckAndRefusals: {
        display: 'flex',
        flexDirection: 'column',
    }
})

interface Props {
    score: ScoreType
    deck: DeckType
    refusalCount: number
}

const ScoreAndDeck: React.FC<Props> = ({ score, deck, refusalCount }) => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <Score />
            <div>
                <Deck />
                <Refusals />
            </div>
            <Score />
        </div>
    )
}

export default ScoreAndDeck
