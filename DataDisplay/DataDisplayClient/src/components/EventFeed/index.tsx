import React from 'react'
import { makeStyles } from '@material-ui/styles'

import RoundCard from './RoundCard'
import SpecialEventCard from './SpecialEventCard'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    }
})

interface Props {}

const EventFeed: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <RoundCard />
            <SpecialEventCard />
            <RoundCard />
            <RoundCard />
        </div>
    )
}

export default EventFeed
