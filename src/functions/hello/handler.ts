import { document } from '@connection/connectionDynamoDb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const{id} =  event.pathParameters
  const {user_id,title} = JSON.parse(event.body)

  const response = {
    id,
    user_id,
    title,
    done: false,
    deadline:new Date()
  }


 await document.put({
    TableName:'task',
    Item:response
  }).promise()

const result = await document.query({
  TableName:'task'
}).promise()

  return formatJSONResponse({
    message: result
  });
};

export const main = middyfy(hello);