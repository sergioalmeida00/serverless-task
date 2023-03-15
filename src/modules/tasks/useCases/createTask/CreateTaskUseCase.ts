
import { Task } from "@tasks/entities/Task";
import { inject, injectable } from "tsyringe";

import { ITaskRepository } from "../../repositories/ITaskRepository";

interface ICreateTaskRequest{
  user_id:string,
  title:string
}

@injectable()
export class CreateTaskUseCase{
  constructor(
    @inject("TaskRepository")
    private taskRepository:ITaskRepository
  ){}

  async execute({user_id,title}:ICreateTaskRequest){
    const task = new Task({user_id,title})
    
    await this.taskRepository.create(task)

    return task
  }
}