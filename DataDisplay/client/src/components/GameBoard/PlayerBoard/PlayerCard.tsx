import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    root: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        border: '1px solid #464545',
    },
    canPropose: {
        textAlign: 'center',
        flex: 1,
    },
    cannotPropose: {
        backgroundColor: 'grey',
        textAlign: 'center',
        flex: 1,
    }
})

interface Props {
    name: string
    isPresident: boolean
    isPreviousPresident: boolean
    isPreviousChancellor: boolean
}

const PlayerCard: React.FC<Props> = ({
    name,
    isPresident,
    isPreviousChancellor,
    isPreviousPresident,
}) => {
    const classes = useStyles({})

    // TODO if 5 player, I think previousPresident can be proposed
    const canPropose = !isPresident && !isPreviousChancellor && !isPreviousPresident

    return (
        <Typography noWrap className={classnames(classes.root, {
            [classes.canPropose]: canPropose,
            [classes.cannotPropose]: !canPropose,
        })}
        >
            {`${isPresident ? '👑  ': ''}${name}`}
        </Typography>
    )
}

export default PlayerCard
