import { MySchedule } from "./mySchedule.model";

export class UserWithSchedule {
    id: string = '';
    email: string = '';
    name: string = '';
    surname: string = '';
    schedule: MySchedule = new MySchedule();
}