import React from 'react'
import { makeStyles } from '@material-ui/styles'

import PlayerCard from './PlayerCard'

const useStyles = makeStyles({

})

interface Props {}

const GameBoard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div>
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
        </div>
    )
}

export default GameBoard
