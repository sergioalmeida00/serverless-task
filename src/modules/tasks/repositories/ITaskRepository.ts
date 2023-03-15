import { Task } from "@tasks/entities/Task";


export interface ITaskRepository{
  create(task:Task):Promise<void>
}