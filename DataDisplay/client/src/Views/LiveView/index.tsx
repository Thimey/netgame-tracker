import React from 'react'
import { makeStyles } from '@material-ui/styles'

import EventFeed from '../../components/EventFeed'
import GameBoard from '../../components/GameBoard'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        border: '1px solid black',
        margin: '1px',
        padding: '30px',
    }
})

interface Props {}

const LiveView: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <EventFeed />
            <GameBoard />
        </div>
    )
}

export default LiveView
