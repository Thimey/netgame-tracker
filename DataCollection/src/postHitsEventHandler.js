'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })
const eventTableName = 'hitsEventData'

function getNewEventPhase(phase) {
    if (phase === 'vote') {
        return 'secondLastVoteWithChancellor'
    }

    if (phase === 'propose') {
        return 'failedVote'
    }

    if (phase === 'check_outcome') {
        return 'missionOutcome'
    }

    return phase
}

function saveEventData(gameId, data) {
    const newEventPhase = getNewEventPhase(data.state.phase)

    const putParams = {
        TableName: eventTableName,
        Item: {
            gameId,
            timestamp: Date.now(),
            data: {
                ...data,
                state: {
                    ...data.state,
                    phase: newEventPhase,
                }
            },
        },
    }

    return documentClient.put(putParams).promise()
}

function checkShouldSaveEvent(event) {
    /*
        Second last vote:
        When there is only one null vote value left. We need this as it's the only time we can
        grab the chancellor for a failed vote
    */
    if (event.state.phase === 'vote') {
        return Object.values(event.state.votes).filter(v => v === null).length === 1
    }

    /*
        Failed vote:
        When going from vote -> proposed and no chancellor is selected
    */
    if (event.state.phase === 'propose') {
        return event.state.previous_phase === 'vote'
            && event.state.chancellor === null
    }

    /*
        President Event:
        Only save first president event to store what they were given (before they select card)
    */
    if (event.state.phase === 'president') {
        return typeof event.state.to_discard === 'undefined'
    }

    /*
        Chancellor Event:
        Only save first president event to store what they were given (before they select card)
    */
   if (event.state.phase === 'chancellor') {
       return typeof event.state.to_enact === 'undefined'
   }

    // Save all other events passed
    return true
}

module.exports.postHitsEventHandler = async (event, context, callback) => {
    console.info(JSON.stringify(event))
    try {
        const hitsEvent = JSON.parse(event.body)
        const gameId = hitsEvent.id

        if (!gameId) {
            throw new Error('No game id found')
        }

        const shouldSaveEvent = checkShouldSaveEvent(hitsEvent)

        if (shouldSaveEvent) {
            await saveEventData(gameId, hitsEvent)
        }

        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://netgames.io',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                saved: true
            }),
        };

        callback(null, response);
    } catch (e) {
        console.error(e)
    }
};
