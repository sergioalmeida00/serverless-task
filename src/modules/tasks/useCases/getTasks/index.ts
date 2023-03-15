import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/GetTasksController.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'get-tasks/{user_id}',
        request: {},
      },
    },
  ],
};
