import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import playerStore from '../../../../playerStore'
import { fascistColor, liberalColor, successVoteColor, failVoteColor } from '../../../../constants'


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
        color: successVoteColor,
    },
    nein: {
        color: failVoteColor,
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
    ya: boolean
}


const Vote: React.FC<Props> = (
    {
        vote: {
            president: presidentIndex,
            votes,
        },
        proposedChancellor: chancellorId,
    }) => {
    const classes = useStyles({})


    const PlayerList: React.FC<PlayerListProps> = ({ ya, players }) => (
        <div className={classes.playerList}>
            {
                players.map(player => (
                    <Typography className={classnames({
                        [classes.ya]: ya,
                        [classes.nein]: !ya,
                    })} noWrap key={player.id}>
                        {player.name}
                    </Typography>
                ))
            }
        </div>
    )

    const players = playerStore.players

    const yaVoters = players.filter(player => votes[player.id])
    const neinVoters = players.filter(player => !votes[player.id])

    const president = playerStore.getPlayerByIndex(presidentIndex)
    const proposedChancellor = playerStore.getPlayerById(chancellorId)

    return (
        <Paper variant='outlined' className={classes.voteContainer}>
            <div className={classes.voteOutcome}>
                <div className={classes.voteList}>
                    <Typography className={classnames(classes.voteHeader)}>Ya</Typography>
                    <PlayerList ya players={yaVoters}/>
                </div>
                <div className={classes.voteList}>
                    <Typography className={classnames(classes.voteHeader)}>Nein</Typography>
                    <PlayerList ya={false} players={neinVoters}/>
                </div>
            </div>
            <div className={classes.voteDetails}>
                <Typography>{`President: ${president ? president.name : '-'}`}</Typography>
                <Typography>{`Proposed chancellor: ${proposedChancellor ? proposedChancellor.name : '-'}`}</Typography>
            </div>
        </Paper>
    )
}

export default Vote
