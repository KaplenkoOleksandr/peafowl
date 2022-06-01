import { MySchedule } from "./mySchedule.model";

export class ProjectWithSchedule {
    id: string = '';
    name: string = '';
    executorId: string = '';
    description: string = '';
    schedule: MySchedule = new MySchedule();
}