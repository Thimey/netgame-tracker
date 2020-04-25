import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

import { fascistColor } from '../../../constants'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        '& > *': {
            marginLeft: '8px'
        },
        '& > :first-child': {
            marginLeft: 0
        },
    },
    lilCircle: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        border: '0.5px solid black'
    },
    failed: {
        backgroundColor: fascistColor,
    },
})

interface Props {
    count: number
}

const Refusals: React.FC<Props> = ({ count }) => {
    const classes = useStyles({})

    return (
        <div className={classes.container}>
            <div className={classnames(classes.lilCircle, { [classes.failed]: count > 0 })} />
            <div className={classnames(classes.lilCircle, { [classes.failed]: count > 1 })} />
            <div className={classnames(classes.lilCircle, { [classes.failed]: count > 2 })} />
        </div>
    )
}

export default Refusals
