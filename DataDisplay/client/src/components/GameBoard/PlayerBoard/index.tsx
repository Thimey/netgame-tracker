import React from 'react'
import { makeStyles } from '@material-ui/styles'

import playerStore from '../../../playerStore'

import PlayerCard from './PlayerCard'
import { Player } from '../../../types'

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
    }
})

interface Props {
    president: Player | null
    previousElectedPresident: Player | null
    previousElectedChancellor: Player | null
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
                        const isPresident = president && president.id === player.id
                        const isPreviousPresident = previousElectedPresident && previousElectedPresident.id === player.id
                        const isPreviousChancellor = previousElectedChancellor && previousElectedChancellor.id === player.id

                        return (
                            <PlayerCard
                                name={player.name}
                                isPresident={!!isPresident}
                                isPreviousPresident={!!isPreviousPresident}
                                isPreviousChancellor={!!isPreviousChancellor}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameBoard
