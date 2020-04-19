import React from 'react'
import { makeStyles } from '@material-ui/styles'

import playerStore from '../../../../playerStore'

import { BaseEventState, Player } from '../../../../types'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flex: 1,
    },
    voteOutcome: {
        display: 'flex',
    },
    playerList: {
        display: 'flex',
        flexDirection: 'column',
    },
    voteDetails: {

    }
})

interface Props {
    vote: BaseEventState
}

interface PlayerListProps {
    players: Player[]
}


const Vote: React.FC<Props> = (
    {
        vote: {
            president,
            chancellor,
            votes,
        }
    }) => {
    const classes = useStyles({})


    const PlayerList: React.FC<PlayerListProps> = ({ players }) => (
        <div className={classes.playerList}>
            {
                players.map(player => (
                    <span key={player.id}>
                        {player.name}
                    </span>
                ))
            }
        </div>
    )

    const players = playerStore.players

    const yaVoters = Object.keys(votes).reduce((voters, id) => {
        if (votes[id]) {
            const player = players.find(player => player.id === id)

            return [...voters, player]
        }

        return voters
    }, [] as any[])

    return (
        <div className={classes.container}>
            <div className={classes.voteOutcome}>
                <PlayerList players={yaVoters}/>
                <PlayerList players={players.filter(player => yaVoters.find(yV => yV.id !== player.id))}/>
            </div>
            <div className={classes.voteDetails}>
                <span>{`President: ${president}`}</span>
                <span>{`Proposed chancellor: ${chancellor}`}</span>
            </div>
        </div>
    )
}

export default Vote
