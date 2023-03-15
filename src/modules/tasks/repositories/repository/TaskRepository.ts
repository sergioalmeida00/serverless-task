
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

}