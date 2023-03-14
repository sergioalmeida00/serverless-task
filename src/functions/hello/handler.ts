import { document } from '@connection/connectionDynamoDb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const{id} =  event.pathParameters
  const {user_id,title} = event.body 

  const response = {
    id,
    user_id,
    title,
    done: false,
    deadline:new Date()
  }


 await document.put({
    TableName:"task",
    Item:response
  }).promise()

const result = await document.scan({
  TableName:'task'
}).promise()

return formatJSONResponse({ ...result }, 200);
};

export const main = middyfy(hello);
