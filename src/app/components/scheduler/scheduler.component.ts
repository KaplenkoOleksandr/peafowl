import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgendaService, DayService, EventSettingsModel, MonthService, ScheduleComponent, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { map, Observable, startWith } from 'rxjs';
import { MySchedule } from 'src/app/models/mySchedule.model';
import { ProjectWithSchedule } from 'src/app/models/projectWithSchedule.model';
import { User } from 'src/app/models/user.model';
import { UserWithSchedule } from 'src/app/models/userWithSchedule.model';
import { ScheduleService } from 'src/app/service/schedule.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduler',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  
  @ViewChild("scheduleObj")
  public scheduleObj!: ScheduleComponent;

  projectSelected: ProjectWithSchedule = new ProjectWithSchedule();
  userSelected: UserWithSchedule = new UserWithSchedule();

  userData: User = new User();
  projects: ProjectWithSchedule[] = [];

  myControl = new FormControl();
  filteredOptions!: Observable<ProjectWithSchedule[]>;

  data: any[] = [];

  public eventSettings: EventSettingsModel = {
      dataSource: this.data
  };

  constructor(private scheduleService: ScheduleService,
    private userService: UserService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();

    this.getProject();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): ProjectWithSchedule[] {
    if(value == '')
      return this.projects;
      
    const filterValue = value.toString().toLowerCase();

    return this.projects.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getProject() {
    this.scheduleService.getProject(this.userData.sub!)
    .subscribe(
      response => {
        this.projects = response;
        console.log(response);
      }
    );
  }

  getUser() {
    this.scheduleService.getUser(this.userData.sub!)
    .subscribe(
      response => {
        this.userSelected = response;
        console.log(this.userSelected)
      }
    );
  }
  
  public displayProperty(value: any) {
    if (value) {
      return value.name;
    }
  }

  get(option: ProjectWithSchedule) {
    this.projectSelected = option;
    this.data.forEach(el => {
      this.data.pop();
    });
    this.scheduleObj.refreshEvents();
    this.toast.success("Project selected", this.projectSelected.name)
  }

  openProjectScheduler() {
    if(this.projectSelected.id == '')
      this.toast.warning("Project not found!")
    
    this.projectSelected.schedule.filling!.split('!@#$%^&^%$#@').forEach(el => {
      if(el != '')
      {
        this.data.push(JSON.parse(el))
      }
    });
    this.scheduleObj.refreshEvents();
    this.toast.success("Data successfully processed!")
  }

  openMyScheduler() {
    this.projectSelected = new ProjectWithSchedule();
    this.data.forEach(el => {
      this.data.pop();
    });
    this.scheduleObj.refreshEvents();

    this.getUser();

    this.userSelected.schedule.filling!.split('!@#$%^&^%$#@').forEach(el => {
      if(el != '')
      {
        this.data.push(JSON.parse(el))
      }
    });
    this.scheduleObj.refreshEvents();
    this.toast.success("My schedule is shown");
  }

  saveScheduler() {
    let dataStringify = '!@#$%^&^%$#@';

    this.data.forEach(el => {
      dataStringify += JSON.stringify(el) + '!@#$%^&^%$#@'
    });

    let sendSchedule: MySchedule = new MySchedule();
    sendSchedule.filling = dataStringify;

    if(this.projectSelected.id != '')
    {
      sendSchedule.id = this.projectSelected.schedule.id;
      sendSchedule.projectId = this.projectSelected.id;

      this.scheduleService.putSchedule(sendSchedule)
      .subscribe(
        response => {
          this.toast.success("Project " + this.projectSelected.name, "Saved!")
        }
      );
    }
    else if(this.userSelected.id != '')
    {
      sendSchedule.id = this.userSelected.schedule.id;
      sendSchedule.userId = this.userSelected.id;

      this.scheduleService.putSchedule(sendSchedule)
      .subscribe(
        response => {
          this.toast.success("User " + this.userSelected.name, "Saved!")
        }
      );
    }
  }
}
