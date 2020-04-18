import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Vote as VoteType, Player } from '../../../../types'

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
    vote: VoteType
}

interface PlayerListProps {
    players: Player[]
}


const Vote: React.FC<Props> = (
    {
        vote: {
            president,
            proposedChancellor,
            ya,
            nein,
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

    const didVoteHappen = president && proposedChancellor

    return (
        <div className={classes.container}>
            {
                didVoteHappen && (
                    <>
                    <div className={classes.voteOutcome}>
                        <PlayerList players={ya}/>
                        <PlayerList players={nein}/>
                    </div>
                    <div className={classes.voteDetails}>
                        <span>{`President: ${president}`}</span>
                        <span>{`Proposed chancellor: ${proposedChancellor}`}</span>
                    </div>
                    </>
                )
            }
        </div>
    )
}

export default Vote
