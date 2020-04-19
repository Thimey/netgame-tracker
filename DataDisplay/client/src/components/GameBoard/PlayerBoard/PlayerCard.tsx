import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
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
    isPreviousChancelor: boolean
}

const PlayerCard: React.FC<Props> = ({
    name,
    isPresident,
    isPreviousChancelor,
    isPreviousPresident,
}) => {
    const classes = useStyles({})

    // TODO if 5 player, I think previousPresident can be proposed
    const canPropose = !isPresident && !isPreviousChancelor && !isPreviousPresident

    return (
        <div className={canPropose ? classes.canPropose : classes.cannotPropose}>
            {`${name}${isPresident ? ' (pres)' : ''}`}
        </div>
    )
}

export default PlayerCard
