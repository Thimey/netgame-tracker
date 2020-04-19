import React from 'react'
import { makeStyles } from '@material-ui/styles'

import playerStore from '../../../playerStore'

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

interface Props {
    president: number | null
    previousElectedPresident: number | null
    previousElectedChancellor: string | null
}

const GameBoard: React.FC<Props> = ({
    president,
    previousElectedPresident,
    previousElectedChancellor,
}) => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <div className={classes.gameBoard}>
                {
                    playerStore.players.map((player, index) => {
                        const isPresident = president === index
                        const isPreviousPresident = previousElectedPresident === index
                        const isPreviousChancelor = previousElectedChancellor === player.id

                        return (
                            <PlayerCard
                                name={player.name}
                                isPresident={isPresident}
                                isPreviousPresident={isPreviousPresident}
                                isPreviousChancelor={isPreviousChancelor}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameBoard
