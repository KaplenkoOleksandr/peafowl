import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/service/candidate.service';
import { AdditionalParams } from 'src/app/models/additionalParams.model';
import { Technology } from 'src/app/models/technology.model';

@Component({
  selector: 'app-dialog-candidate-table',
  templateUrl: './dialog-candidate-table.component.html',
  styleUrls: ['./dialog-candidate-table.component.css']
})
export class DialogCandidateTableComponent implements OnInit {
  candidates: Candidate[] = [];
  isSelected: boolean = false;
  idSelected: string = '';
  additionalParams: AdditionalParams[] = [];
  deleted: AdditionalParams[] = [];

  technology: Technology[] = [];
  ableTechology: Technology[] = [];
  deletedTechology: Technology[] = [];
  openDropDown: boolean = false;

  isShowCreate: boolean = false;

  pipeString: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
  private candidateService: CandidateService) { }

  candidate: Candidate = {
    id: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    linkedIn: '',
    processingStatus: ''
  }

  addCandidate = {
    li_at: '',
    linkedIn: '',
    technologyId: this.data.technologyId
  }

  createCandidate() {
    this.candidateService.createCandidate(this.addCandidate)
    .subscribe(
      response => {
        this.getCandidates();
      }
    );
  }

  ngOnInit(): void {
    this.getCandidates();

    let temp = localStorage.getItem('li_at');
    if(temp) this.addCandidate.li_at = temp;
  }

  closeShowCreate() {
    this.isShowCreate = !this.isShowCreate;
  }

  getCandidates() {
    this.candidateService.getCandidates(this.data.technologyId)
    .subscribe(
      response => {
        this.candidates = response;
      }
    );
  }

  onSubmit() {
    this.candidateService.updateCandidateTechnologyList(this.data.technologyId, this.idSelected, this.technology)
    .subscribe(
      response => {
        this.candidateService.deleteAdditionalParams(this.deleted)
        .subscribe(
          response => {
            this.candidateService.updateAdditionalParams(this.additionalParams)
            .subscribe(
              response => {
                this.candidateService.UpdateCandidate(this.candidate)
                .subscribe(
                  response => {
                    alert("Success");
                        this.getCandidateById(response.id);
                        this.getCandidates();
                        this.getAbleTechnology(response.id, this.data.projectId);
                        this.getTechnologyCandidate(response.id)
                        this.deleted = [];
                        this.deletedTechology = [];
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  deleteAdditionalParam(id: string) {
    this.additionalParams.forEach((element,index)=>{
      if(element.id == id) 
      {
        this.additionalParams.splice(index,1);
        this.deleted.push(element);
      }
   });
  }

  try() {
    let _new = new AdditionalParams;
    _new.id = '0';
    _new.candidateId = this.candidate.id;
    this.additionalParams.push(_new);
  }

  getAdditionalParams(candudateId: string) {
    this.candidateService.getAdditionalParams(candudateId)
    .subscribe(
      response => {
        this.additionalParams = response;
      }
    );
  }

  getCandidateById(id: string) {
    this.candidateService.getCandidateById(id)
      .subscribe(
        response => {
          this.candidate = response;
          this.getAdditionalParams(this.candidate.id);
        }
      );
  }

  changeSelectedCandidate(id?: string) {
    if(id != null)
    {
      this.idSelected = id;
      this.getCandidateById(id);
      this.getTechnologyCandidate(id);
      this.getAbleTechnology(id, this.data.projectId)
      this.deleted = [];
      this.deletedTechology = [];
    }

    this.isSelected = !this.isSelected;
  }

  getTechnologyCandidate(candidateId: string){
    this.candidateService.getTechnologyCandidate(candidateId)
    .subscribe(
      response => {
        this.technology = response;
        console.log(response);
      }
    );
  }

  getAbleTechnology(candidateId: string, projectId: string)
  {
    this.candidateService.getAbleTechnology(candidateId, projectId)
    .subscribe(
      response => {
        this.ableTechology = response;
      }
    );
  }

  openCloseDropDown(technology?: Technology) {
    this.openDropDown = !this.openDropDown;

    if(technology)
    {
      this.technology.push(technology);
    }
  }

  addToListTechnology(t: Technology) {
    this.ableTechology.forEach((element,index)=>{
      if(element.id == t.id) 
      {
        this.ableTechology.splice(index,1);
        this.technology.push(t);
      }
   });
  }

  deleteFromListTechnology(t: Technology) {
    this.technology.forEach((element,index)=>{
      if(element.id == t.id) 
      {
        this.technology.splice(index,1);
        this.deletedTechology.push(t);
      }
   });
  }

  popFromDelete(t: Technology) {
    this.deletedTechology.forEach((element,index)=>{
      if(element.id == t.id) 
      {
        this.deletedTechology.splice(index,1);
        this.technology.push(t);
      }
   });
  }
}