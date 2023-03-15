import { ITaskRepository } from "@tasks/repositories/ITaskRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTaksUseCase{
  constructor(
    @inject("TaskRepository")
    private taskRepository:ITaskRepository
  ){}

  async execute(user_id:string){
    const tasksUserById = await this.taskRepository.findAllTasks(user_id)

    return tasksUserById
  }
}