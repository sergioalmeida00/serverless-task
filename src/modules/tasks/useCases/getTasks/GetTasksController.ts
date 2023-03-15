import { APIEventBodySchema, formatJSONResponse } from "@libs/api-gateway";
import middy from "@middy/core";
import { dicontainer } from "@shared/container";
import { Task } from "@tasks/entities/Task";
// import GetTasksSchema from "./GetTasksSchema";
import { GetTaksUseCase } from "./GetTasksUseCase";
class GetTasksController{
  async handle (event:APIEventBodySchema<typeof Task>){
    const {user_id} = event.pathParameters
    const getTaskUseCase = dicontainer.resolve(GetTaksUseCase)

    const tasksUserById = await getTaskUseCase.execute(user_id)

    return formatJSONResponse({ ...tasksUserById }, 200);

  }
}

export const main = middy(new GetTasksController().handle)