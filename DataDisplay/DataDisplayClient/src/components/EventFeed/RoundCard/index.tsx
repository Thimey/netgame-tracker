import React from 'react'
import { makeStyles } from '@material-ui/styles'

import RoundDetails from './RoundDetails'
import VoteRoundList from './VoteRoundList'


const useStyles = makeStyles({
    container: {
        display: 'flex',
    }
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
