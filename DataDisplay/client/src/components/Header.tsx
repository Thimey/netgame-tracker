import React from 'react'
import { makeStyles } from '@material-ui/styles'

import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        padding: '1rem',
        '& > :last-child': {
            paddingLeft: '1rem',
        },
    },
    poweredBy: {
        textAlign: 'right',
    },

})

interface Props {}

const LiveView: React.FC<Props> = () => {
    const classes = useStyles({})

    return (
        <Grid className={classes.container}>
            <Grid item xs={9}>
                <Typography color='textPrimary' variant='h4'>
                    Lahd Hits
                </Typography>
            </Grid>

            <Grid className={classes.poweredBy} item xs={3}>
                <Typography  color='textPrimary' variant='caption'>
                    For the lahds. Powered by 3Amigos
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LiveView
