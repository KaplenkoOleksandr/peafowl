import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { TechnologyService } from 'src/app/service/technology.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-technology-create',
  templateUrl: './dialog-technology-create.component.html',
  styleUrls: ['./dialog-technology-create.component.css']
})
export class DialogTechnologyCreateComponent{

  constructor(private technologyService: TechnologyService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  technology: Technology = {
    id: '',
    name: '',
    projectId: this.data.projectId
  }
  
  onSubmit() {
    this.technologyService.addTechnology(this.technology)
    .subscribe(
      response => {
        alert("Success");
      }
    );
  }
}
