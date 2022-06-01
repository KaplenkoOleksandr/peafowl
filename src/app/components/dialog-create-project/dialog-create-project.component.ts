import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { ProjectUserService } from 'src/app/service/project-user.service';

@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './dialog-create-project.component.html',
  styleUrls: ['./dialog-create-project.component.css']
})
export class DialogCreateProjectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private projectUserService: ProjectUserService) { }

  ngOnInit(): void {
  }

  project: Project = {
    id: '0',
    name: '',
    executorId: this.data.user.sub,
    description: ''
  }
  
  onSubmit() {
    this.projectUserService.createProject(this.data.user, this.project)
    .subscribe(
      response => {
        alert("Success");
      }
    );
  }
}
