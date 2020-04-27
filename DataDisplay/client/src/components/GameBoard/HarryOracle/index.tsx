import React, { useState, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import harryOracle from './harryOracle.png'

import { getProbablityOfAtLeastOneLiberal } from './utils'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    liberalCountField: {
        width: '60px',
    }
})

interface Props {
    deckCount: number
}

const HarryOracle: React.FC<Props> = ({ deckCount }) => {
    const classes = useStyles({})
    const [liberalCardCount, setLiberalCardCount] = useState<number>()

    const onLiberalCountChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLiberalCardCount(parseInt(event.target.value, 10))
    }

    return (
        <div className={classes.container}>
            <img
                src={harryOracle}
                alt='Harry the oracle'
                width='40px'
            />
            <Typography>
                {liberalCardCount
                    ? `${getProbablityOfAtLeastOneLiberal(deckCount, liberalCardCount)} % to get at least 1 liberal!`
                    : 'Ella, tell me the liberal count'}
            </Typography>
            <div className={classes.liberalCountField}>
                <TextField
                    value={liberalCardCount}
                    type='number'
                    onChange={onLiberalCountChange}
                    variant='outlined'
                    size='small'
                />
            </div>
        </div>
    )
}

export default HarryOracle
