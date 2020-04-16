import React from 'react'
import { makeStyles } from '@material-ui/styles'

import RoundDetails from './RoundDetails'
import VoteRoundList from './VoteRoundList'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        border: '1px solid black',
        marginBottom: '10px',
    },
})

interface Props {}

const RoundCard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>

            <VoteRoundList />
            <RoundDetails />
        </div>
    )
}

export default RoundCard
