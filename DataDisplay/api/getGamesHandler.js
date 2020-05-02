'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })
const eventTableName = 'hitsGames'

function getGameEvents() {
    const queryParams = {
        TableName: eventTableName,
    }

    return documentClient.scan(queryParams).promise()
}

module.exports.getGamesHandler = async (event, context, callback) => {
    console.info(JSON.stringify(event))
    try {
        const gameEvents = await getGameEvents()
        console.info(gameEvents)

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
