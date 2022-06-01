import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectUserService } from 'src/app/service/project-user.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { ProjectUserComponent } from '../project-user/project-user.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  userProjectData: Project = new Project;
  userData: User = new User;
  project: string = '';

  constructor(private projectUserService: ProjectUserService,
    private userService: UserService,
    private projectUserComponent: ProjectUserComponent) { }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectUserService.getProject(this.userData, this.projectUserComponent.idProjectSelect)
    .subscribe(
      response => {
        this.userProjectData = response;
      }
    );
  }

  changeIsProjectSelect() {
    this.projectUserComponent.changeIsProjectSelect();
  }
}
