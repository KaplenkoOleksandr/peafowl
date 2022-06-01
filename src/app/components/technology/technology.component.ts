import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Technology } from 'src/app/models/technology.model';
import { User } from 'src/app/models/user.model';
import { TechnologyService } from 'src/app/service/technology.service';
import { UserService } from 'src/app/service/user.service';
import { DialogCandidateTableComponent } from '../dialog-candidate-table/dialog-candidate-table.component';
import { DialogTechnologyCreateComponent } from '../dialog-technology-create/dialog-technology-create.component';
import { ProjectUserComponent } from '../project-user/project-user.component';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  technology: Technology[] = [];
  userData: User = new User;

  isOpenTechnology: boolean = true;
  isOpenTeam: boolean = true;

  filteringTechnology: string = '';

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private projectUserComponent: ProjectUserComponent,
    private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();
    this.getAllTechnology();
  }

  openCloseTechnologyTab() {
    this.isOpenTechnology = !this.isOpenTechnology;
  }

  openCloseTeamTab() {
    this.isOpenTeam = !this.isOpenTeam;
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(DialogTechnologyCreateComponent, 
      {
        data: {
          projectId: this.projectUserComponent.idProjectSelect
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getAllTechnology();
      });
  }

  openDialog(technologyId: string): void {
    let dialogRef = this.dialog.open(DialogCandidateTableComponent, 
    {
      disableClose: true,
      
      data: {
        technologyId: technologyId,
        projectId: this.projectUserComponent.idProjectSelect
      }
    });

    dialogRef.backdropClick()
    .subscribe(
      _ => {
        let cn = confirm('Sure ?');
        if (cn) {
          dialogRef.close();
        }
      }
    );
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology(this.userData, this.projectUserComponent.idProjectSelect)
    .subscribe(
      response => {
        this.technology = response;
      }
    );
  }
}
