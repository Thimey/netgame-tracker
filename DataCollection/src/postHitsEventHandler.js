'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })
const eventTableName = 'hitsEventData'

function saveEventData(gameId, data) {
    const putParams = {
        TableName: eventTableName,
        Item: {
            gameId,
            timestamp: Date.now(),
            data,
        },
    }

    return documentClient.put(putParams).promise()
}

module.exports.postHitsEventHandler = async event => {
    console.info(JSON.stringify(event))
    try {
        const hitsEvent = JSON.parse(event.body)
        const gameId = hitsEvent.id

        if (!gameId) {
            throw new Error('No game id found')
        }

        return saveEventData(gameId, hitsEvent)
    } catch (e) {
        console.error(e)
    }
};
