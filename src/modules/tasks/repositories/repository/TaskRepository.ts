
import { document } from "@connection/connectionDynamoDb";
import { Task } from "@tasks/entities/Task";
import { ITaskRepository } from "../ITaskRepository";

export class TaskRepository implements ITaskRepository{

  async create(task: Task): Promise<void> {
    await document.put({
      TableName:"task",
      Item:task
    }).promise()
  }

  async findAllTasks(user_id: string): Promise<Task[] | any> {
    const tasksUser = await document.query({
      TableName:"task",
      IndexName: "user_id_index",
      KeyConditionExpression:"user_id = :user_id",
      ExpressionAttributeValues:{
        ":user_id":user_id
      }
    }).promise()
    
    return tasksUser
  }

}