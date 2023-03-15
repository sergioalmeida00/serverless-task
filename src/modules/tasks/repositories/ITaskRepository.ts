import { Task } from "@tasks/entities/Task";


export interface ITaskRepository{
  create(task:Task):Promise<void>
  findAllTasks(user_id:string):Promise<Task[]>
}