import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import InvestigationIcon from '@material-ui/icons/Search'
import PeekIcon from '@material-ui/icons/Visibility'
import ExecutionIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SpecialElectionIcon from '@material-ui/icons/StarBorderOutlined'

import { specialEventColor } from '../../constants'
import playerStore from '../../playerStore'
import { EventState,
    isInvestigationEvent,
    isExecutionEvent,
    isSpecialElectionEvent,
    isPolicyPeekEvent,
} from '../../types'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
    },
    header: {
        color: specialEventColor,
    },
    eventDetails: {
        display: 'flex',
        marginTop: '5px',
        justifyContent: 'center',
    }
})

interface Props {
    event: EventState
}

const SpecialEventCard: React.FC<Props> = ({ event }) => {
    const classes = useStyles({})

    const getIcon = () => {
        if (isInvestigationEvent(event)) {
            return <InvestigationIcon />
        }

        if (isExecutionEvent(event)) {
            return <ExecutionIcon />
        }

        if(isSpecialElectionEvent(event)) {
            return <SpecialElectionIcon />
        }

        // policy peek
        return <PeekIcon />
    }

    const getAdditionalText = () => {
        if (isInvestigationEvent(event)) {
            return 'investigated'
        }

        if (isExecutionEvent(event)) {
            return 'executed'
        }

        if (isSpecialElectionEvent(event)) {
            return 'elected'
        }

        // policy peek
        return 'peeked'
    }

    const getOtherPlayer = () => {
        if (isInvestigationEvent(event)) {
            return playerStore.getPlayerById(event.to_investigate)?.name
        }
    
        if (isExecutionEvent(event)) {
            return playerStore.getPlayerById(event.to_execute)?.name
        }

        if (isSpecialElectionEvent(event)) {
            return playerStore.getPlayerByIndex(event.next_president).name
        }
    }

    const playerToEnact = playerStore.getPlayerByIndex(event.president)

    return (
        <Paper elevation={3} className={classes.container}>
            <Typography
                variant='h6'
                className={classes.header}
            >
                {`Special Event`}
            </Typography>
            {getIcon()}
            <div className={classes.eventDetails}>
                <Typography>
                    {`${playerToEnact && playerToEnact.name} `}
                    <b>{` ${getAdditionalText()} `}</b>
                    {!isPolicyPeekEvent(event) && `${getOtherPlayer()}`}
                </Typography>
            </div>
        </Paper>
    )
}

export default SpecialEventCard
