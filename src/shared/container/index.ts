import "reflect-metadata";
import { ITaskRepository } from "src/modules/tasks/repositories/ITaskRepository";
import { TaskRepository } from "src/modules/tasks/repositories/repository/TaskRepository";

import { container } from "tsyringe";

container.registerSingleton<ITaskRepository>(
  "TaskRepository",
  TaskRepository
)


export const dicontainer = container;