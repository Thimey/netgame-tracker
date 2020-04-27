import React, { useState, useEffect, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import harryOracle from './harryOracle.png'

import { getProbablityOfAtLeastOneLiberal, harryQuotes } from './utils'


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
    const [quoteIndex, setQuoteIndex] = useState<number>(0)

    const onLiberalCountChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLiberalCardCount(parseInt(event.target.value, 10))
    }

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            const index = Math.floor(Math.random() * harryQuotes.length)

            console.log('index', index)
            setQuoteIndex(index)
        }, 1000)

        return clearInterval(quoteInterval)
    }, [])

    return (
        <div className={classes.container}>
            <img
                src={harryOracle}
                alt='Harry the oracle'
                width='40px'
            />
            <Typography>
                {`${harryQuotes[quoteIndex]}`}
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
            <Typography>
                {liberalCardCount
                    ? `${getProbablityOfAtLeastOneLiberal(deckCount, liberalCardCount)} % to get at least 1 liberal!`
                    : ' '}
            </Typography>
        </div>
    )
}

export default HarryOracle
