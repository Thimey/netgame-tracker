import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import playerStore from '../../../../playerStore'
import { fascistColor, liberalColor } from '../../../../constants'


import { EventState, Player } from '../../../../types'

const useStyles = makeStyles({
    voteContainer: {
        display: 'flex',
        flex: 1,
        padding: '0.5rem',
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
    ya: {
        color: liberalColor,
    },
    nein: {
        color: fascistColor,
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
                    <Typography noWrap key={player.id}>
                        {player.name}
                    </Typography>
                ))
            }
        </div>
    )

    const players = playerStore.players

    const yaVoters = players.filter(player => votes[player.id])
    const neinVoters = players.filter(player => !votes[player.id])

    return (
        <Paper variant='outlined' className={classes.voteContainer}>
            <div className={classes.voteOutcome}>
                <div className={classes.voteList}>
                    <Typography className={classnames(classes.voteHeader, classes.ya)}>Ya</Typography>
                    <PlayerList players={yaVoters}/>
                </div>
                <div className={classes.voteList}>
                    <Typography className={classnames(classes.voteHeader, classes.nein)}>Nein</Typography>
                    <PlayerList players={neinVoters}/>
                </div>
            </div>
            <div className={classes.voteDetails}>
                <Typography>{`President: ${playerStore.getPlayerByIndex(president)}`}</Typography>
                <Typography>{`Proposed chancellor: ${proposedChancellor ? playerStore.getPlayerById(proposedChancellor) : '-'}`}</Typography>
            </div>
        </Paper>
    )
}

export default Vote
