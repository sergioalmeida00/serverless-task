import schema from "./CreateTaskSchema";
import { handlerPath } from "@libs/handler-resolver";

export default{
  handler:`${handlerPath(__dirname)}/CreateTaskController.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello/{user_id}',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
}