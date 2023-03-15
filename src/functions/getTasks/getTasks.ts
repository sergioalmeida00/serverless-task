import { document } from "@connection/connectionDynamoDb";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyHandler } from "aws-lambda";

const getTasks: APIGatewayProxyHandler = async (event) => {
  const {user_id} = event.pathParameters

  if(!user_id) return;

  const tasksUser = await document.query({
    TableName:"task",
    IndexName: "user_id_index",
    KeyConditionExpression:"user_id = :user_id",
    ExpressionAttributeValues:{
      ":user_id":user_id
    }
  }).promise()
  console.log(tasksUser.Items)
  return formatJSONResponse({ ...tasksUser }, 200);
}
export const main = middyfy(getTasks);