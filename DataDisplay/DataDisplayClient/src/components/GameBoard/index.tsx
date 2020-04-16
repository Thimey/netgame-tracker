import React from 'react'
import { makeStyles } from '@material-ui/styles'

import PlayerCard from './PlayerCard'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
    },
    gameBoard: {
        display: 'flex',
        width: '80%',
        height: 'fit-content',
        flexDirection: 'column',
        border: '1px solid black',
    }
})

interface Props {}

const GameBoard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <div className={classes.gameBoard}>
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
            </div>
        </div>
    )
}

export default GameBoard
