import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { ProjectUserService } from 'src/app/service/project-user.service';
import { Project } from 'src/app/models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateProjectComponent } from '../dialog-create-project/dialog-create-project.component';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.css']
})
export class ProjectUserComponent implements OnInit {
  userData: User = new User;
  userProjects: Project[] = [];
  isProjectSelect: Boolean = false;
  idProjectSelect: string = '';

  constructor(private userService: UserService, private projectUserService: ProjectUserService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();
    this.getProjects();
  }

  getProjects() {
    this.projectUserService.getProjectsCurrentUser(this.userData)
    .subscribe(
      response => {
        this.userProjects = response;
      }
    );
  }

  changeIsProjectSelect(projectId?: string){
    if(projectId != null)
      this.idProjectSelect = projectId;

    this.isProjectSelect = !this.isProjectSelect;
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(DialogCreateProjectComponent, 
      {
        data: {
          user: this.userData
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getProjects();
      });
  }
}
