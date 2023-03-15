import { v4 as uuidV4 } from "uuid";

interface ITask{
  id?:string,
  user_id:string,
  title:string,
  done?:boolean
  deadline?:Date
}
export class Task{
  constructor({id,user_id,title,deadline,done}:ITask){
    const idGen = id || uuidV4();

    Object.assign(this,{
      id:idGen,
      user_id,
      title,
      done:false,
      deadline:new Date()
    })
  }

  id:string;
  user_id:string;
  title:string;
  done:boolean;
  deadline:Date

}