const AWS = require('aws-sdk')
const { request, response, logger } = require('@compassion-technology/lambda-helpers')
const tableName = process.env.MEDIA_TABLE_NAME

module.exports.handler = async (event, context) => {
  const log = logger()
  try {
    log.request(event, 'getMedia')
    log.fyi('Getting beneficiary id from path parameters')
    log.fyi(`${event.pathParameters.beneficiaryId}`)
    if (!event.pathParameters) {
        log.fyiNah('No path params!')
        return response.error('No path params passed', 400)
    }
    const beneficiaryId = event.pathParameters.beneficiaryId
    if (!beneficiaryId || beneficiaryId.length === 0) {
      log.fyiNah('No beneficiary id provided')
      return response.error('No beneficiary id', 400)
    }
    
    /**
     * Get benefiary media row from dynamo
    **/
    log.fyi(`Getting media entry from dynamoDB`)
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const queryParams = {
        TableName: tableName,
        KeyConditionExpression: 'beneficiaryId = :beneficiaryId',
        IndexName: 'beneficiaryId-index',
        ExpressionAttributeValues: {
        ':beneficiaryId': Number(beneficiaryId),
        ':statusCondition': 'Complete'
        },
        FilterExpression: 'workflowStatus = :statusCondition',
        ProjectionExpression: 'beneficiaryId, mp4Urls, endTime'
    }
    const result = await dynamodb.query(queryParams).promise()
    if (!result || !result.Items || result.Items.length === 0) {
        log.fyiNah(`no completed beneficiaryId media record with id ${beneficiaryId}`)
        return response.error('Not found', 404)
    }
    const media = result.Items[0]
    
    log.accomplish('successfully retreived media data')
    return response.success(media)
  } catch (e) {
    log.ohno(e, "something went wrong in 'getMedia'.")
    return response.error(e)
  }
}