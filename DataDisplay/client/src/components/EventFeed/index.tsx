import React from 'react'
import { makeStyles } from '@material-ui/styles'

import {
    EventState,
    isInvestigationEvent,
    isExecutionEvent,
    isSpecialElectionEvent,
    isPolicyPeekEvent,
} from '../../types'

import RoundCard from './RoundCard'
import SpecialEventCard from './SpecialEventCard'

function isSpecialEvent(state: EventState) {
    return (
        isInvestigationEvent(state) ||
        isExecutionEvent(state) ||
        isSpecialElectionEvent(state) ||
        isPolicyPeekEvent(state)
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        '& > *': {
            marginBottom: '1rem',
        },
    }
})

interface Props {
    states: EventState[]
}


const EventFeed: React.FC<Props> = ({ states }) => {
    const classes = useStyles({})

    const releventEvents = states.filter(
        state => (
            state.phase === 'secondLastVoteWithChancellor' ||
            state.phase === 'failedVote' ||
            state.phase === 'missionOutcome' ||
            isSpecialEvent(state) 
        )
    )

    const getCards = (states: EventState[]) => {
        let isNewRound = true
        let isNewSpecialElectionEvent = true
        const cards: EventState[][] = []

        states.forEach((state) => {
            if (state.phase === 'secondLastVoteWithChancellor' || state.phase === 'failedVote' || !cards.length) {
                if (isNewRound) {
                    cards.push([state])
                } else {
                    cards[cards.length - 1].push(state)
                }

                isNewRound = false
            } else if (state.phase === 'missionOutcome') {
                // is a missionOutcome = end of round
                cards[cards.length - 1].push(state)

                isNewRound = true
                isNewSpecialElectionEvent = true
            } else if (isInvestigationEvent(state) || isExecutionEvent(state) || isPolicyPeekEvent(state)) {
                // must be a special event - always create new card
                cards.push([state])

                isNewRound = true
            } else if (isSpecialElectionEvent(state)) {
                if (isNewSpecialElectionEvent) {
                    cards.push([state])
                } else {
                    cards[cards.length - 1].push(state)
                }

                isNewSpecialElectionEvent = false
            }
        })

        return cards
    }

    const consolidateSpecialElectionEvents = (eventGroups: EventState[][]) => (
        eventGroups.reduce((cards, eventGroup) => {
            // for special elections we get an event each time the president changes their selection - we only want the last one
            if (isSpecialElectionEvent(eventGroup[0])) {
                return [...cards, [eventGroup[eventGroup.length - 1]]]
            }

            return [...cards, [...eventGroup]]
        }, [] as EventState[][])
    )

    const cardEventGroups = consolidateSpecialElectionEvents(getCards(releventEvents))
    

    return (
        <div className={classes.container}>
            {
                cardEventGroups.map((eventGroup, i) => {
                    if (isSpecialEvent(eventGroup[0])) {
                        return <SpecialEventCard key={i} event={eventGroup[0]}/>
                    }

                    return <RoundCard key={i} round={eventGroup} />
                })
            }
        </div>
    )
}

export default EventFeed
