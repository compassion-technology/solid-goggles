const AWS = require('aws-sdk')
const { request, response, logger } = require('@compassion-technology/lambda-helpers')
const tableName = process.env.MEDIA_TABLE_NAME

module.exports.handler = async (event, context) => {
  const log = logger()
  try {
    log.request(event, 'getMedia')
    log.progress('Getting beneficiary id from path parameters')
    if (!event.pathParameters) {
        throw new Error('Could not read beneficiary id from path parameters')
    }
    const beneficiaryId = event.pathParameters.beneficiaryId
    if (!beneficiaryId || beneficiaryId.length === 0) {
      log.reject('No beneficiary id provided')
      return response.error('No beneficiary id', 400)
    }
    
    /**
     * Get benefiary media row from dynamo
    **/
    log.progress(`Getting media entry from dynamoDB`)
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const queryParams = {
        TableName: tableName,
        KeyConditionExpression: 'beneficiaryId = :beneficiaryId',
        IndexName: 'beneficiaryId-index',
        ExpressionAttributeValues: {
        ':beneficiaryId': beneficiaryId,
        ':statusCondition': 'Complete'
        },
        FilterExpression: 'workflowStatus = :statusCondition',
        ProjectionExpression: 'beneficiaryId, mp4Urls, endTime'
    }
    const result = await dynamodb.query(queryParams).promise()
    if (!result || !result.Items || result.Items.length === 0) {
        log.reject(`no completed beneficiaryId media record with id ${beneficiaryId}`)
        return response.error('Not found', 404)
    }
    const media = result.Items[0]
    
    log.success('successfully retreived media data')
    return response.success(media)
  } catch (e) {
    log.error(e, "something went wrong in 'getMedia'.")
    return response.error(e)
  }
}