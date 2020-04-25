import React from 'react'
import { makeStyles } from '@material-ui/styles'

import playerStore from '../../../../playerStore'

import { EventState, Player } from '../../../../types'

const useStyles = makeStyles({
    voteContainer: {
        display: 'flex',
        flex: 1,
        borderBottom: '1px solid grey',
    },
    voteOutcome: {
        display: 'flex',
        width: '40%',
    },
    voteList: {
        width: '50%',
        textAlign: 'center',
    },
    voteHeader: {
        paddingBottom: '2px',
        fontWeight: 'bold',
    },
    playerList: {
        display: 'flex',
        flexDirection: 'column',
    },
    voteDetails: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        flex: 1,
    }
})

interface Props {
    vote: EventState
    proposedChancellor: string
}

interface PlayerListProps {
    players: Player[]
}


const Vote: React.FC<Props> = (
    {
        vote: {
            president,
            votes,
        },
        proposedChancellor,
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

    const yaVoters = players.filter(player => votes[player.id])
    const neinVoters = players.filter(player => !votes[player.id])

    return (
        <div className={classes.voteContainer}>
            <div className={classes.voteOutcome}>
                <div className={classes.voteList}>
                    <div className={classes.voteHeader}>Ya</div>
                    <PlayerList players={yaVoters}/>
                </div>
                <div className={classes.voteList}>
                    <div className={classes.voteHeader}>Nein</div>
                    <PlayerList players={neinVoters}/>
                </div>
            </div>
            <div className={classes.voteDetails}>
                <span>{`President: ${playerStore.getPlayerByIndex(president)}`}</span>
                <span>{`Proposed chancellor: ${proposedChancellor ? playerStore.getPlayerById(proposedChancellor) : '-'}`}</span>
            </div>
        </div>
    )
}

export default Vote
