'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })
const eventTableName = 'hitsEventData'

function getGameEvents(gameId) {
    const queryParams = {
        TableName: eventTableName,
        KeyConditionExpression: [
            'gameId = :gameId',
        ].join(' '),
        ExpressionAttributeValues: {
            ':gameId': gameId,
        },
        ScanIndexForward: true,
    }

    return documentClient.query(queryParams).promise()
}

module.exports.getGameDataHandler = async (event, context, callback) => {
    console.info(JSON.stringify(event))
    try {
        const queryParams = event.queryStringParameters

        const gameId = queryParams.gameId

        if (!gameId) {
            throw new Error('No game id found')
        }

        const gameEvents = await getGameEvents(gameId)

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                events: gameEvents.Items,
            }),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
        };

        return response
    } catch (e) {
        console.error(e)
    }
};
