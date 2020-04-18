import React from 'react'
import { makeStyles } from '@material-ui/styles'

import PlayerBoard from './PlayerBoard'
import ScoreAndDeck from './ScoreAndDeck'

const useStyles = makeStyles({

})

interface Props {}

const GameBoard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div>
            <PlayerBoard />
        </div>
    )
}

export default GameBoard
