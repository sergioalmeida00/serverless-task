import { APIEventBodySchema, formatJSONResponse } from "@libs/api-gateway";
import middy from "@middy/core";
import { dicontainer } from "src/shared/container";
import CreateTaskSchema from "./CreateTaskSchema";
import { CreateTaskUseCase } from "./CreateTaskUseCase";
class CreateTaskController{

  async handle(event: APIEventBodySchema<typeof CreateTaskSchema>) {
    const {user_id} = event.pathParameters
    const {title} = JSON.parse(event.body)
    const createTaskUseCase = dicontainer.resolve(CreateTaskUseCase)

    const result = await createTaskUseCase.execute({user_id,title})

    return formatJSONResponse({ ...result }, 201);
  }
}

export const main = middy(new CreateTaskController().handle)