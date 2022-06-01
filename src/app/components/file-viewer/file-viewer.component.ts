import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import WebViewer from '@pdftron/webviewer';
import * as htmlToImage from 'html-to-image';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateFile } from 'src/app/models/candidateFile.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { FileViewerService } from 'src/app/service/file-viewer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})

export class FileViewerComponent implements OnInit {
  @ViewChild('viewer', {static: true}) viewer!: ElementRef;
  currentFile: File | undefined;
  userData: User = new User();

  pathToFile: string = "https://diplom.blob.core.windows.net/pictures/";
  sas: string = "sp=racwdl&st=2022-05-28T08:03:30Z&se=2023-01-31T17:03:30Z&sv=2020-08-04&sr=c&sig=DZMc8X30Yy8oYGGtiosNZIvkXKZ%2BnAGtQFL%2BVoyij2k%3D";

  constructor(private fileViewerService: FileViewerService,
    private userService: UserService,
    private toast: ToastrService) { }

  projectsControl = new FormControl();
  projects: Project[] = [];
  filteredProjects!: Observable<Project[]>;

  private _projectsFilter(value: string): Project[] {
    this.candidates = [];
    if(value == "")
      return this.projects;
    const filterValue = value.toString().toLowerCase();
    return this.projects.filter(project => project.name.toLowerCase().includes(filterValue));
  }

  candidateControl = new FormControl();
  candidates: Candidate[] = [];
  filteredCandidates!: Observable<Candidate[]>;

  private _candidatesFilter(value: string): Candidate[] {
    if(value == "")
      return this.candidates;
    const filterValue = value.toString().toLowerCase();
    return this.candidates.filter(candidate => candidate.name.toLowerCase().includes(filterValue));
  }

  candidateFiles: CandidateFile[] = [];

  newFile: CandidateFile = {
    id: '0',
    candidateId: '',
    fileName: '',
    fileUrl: ''
  }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();

    this.getProjects();

    WebViewer({
      path: '../../assets/lib',
    }, this.viewer.nativeElement).then(instance => {
      const { Feature } = instance.UI;
      instance.UI.enableFeatures([Feature.FilePicker]);

      document.getElementById('file_upload')?.addEventListener('change', (e) => {
        instance.UI.loadDocument(this.currentFile!);
      });
    });
  }

  public displayProperty(value: any) {
    if (value) {
      return value.name;
    }
  }

  onSubmit() {
    if(this.currentFile?.name == undefined)
    {
      this.toast.error("Select File");
      return;
    }
    if(this.newFile.fileName == '') {
      this.toast.error("Choose File name");
      return;
    }
    if(this.newFile.candidateId == '') {
      this.toast.error("Select candidate");
      return;
    }
    this.postFile();
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toast.info("Copied!")
  }

  getProjects() {
    this.fileViewerService.getProjects(this.userData)
    .subscribe(
      response => {
        this.projects = response;
        this.filteredProjects = this.projectsControl.valueChanges.pipe(
          startWith(''),
          map(value => this._projectsFilter(value)),
        );
      }
    );
  }

  postFile() {
    this.fileViewerService.postEmptyFile(this.newFile.candidateId, this.newFile)
    .subscribe(
      response => {
        let date = new Date();
        let dateString = date.getFullYear() + date.getMonth().toString() + date.getDay().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
        this.fileViewerService.uploadImage(this.sas, this.currentFile!, dateString + this.currentFile?.name, () => {
          response.fileUrl = this.pathToFile + dateString + this.currentFile?.name
          this.fileViewerService.putCandidateFile(response.candidateId, response)
          .subscribe(
            response => {
              this.candidateFiles = response;
            }
          );
        })
      }
    );
  }

  deldeleteCandidateFile(candidateId: string, fileId: string, fileUrl: string) {
    this.fileViewerService.deleteImage(this.sas, fileUrl.replace(this.pathToFile, ''), () => {
      this.fileViewerService.deleteCandidateFile(candidateId, fileId)
      .subscribe(
        response => {
          this.candidateFiles = response;
          this.toast.success("Dile deleted!")
        }
      );
    })
  }

  getProjectsCandidate(project: Project) {
    this.fileViewerService.getProjectsCandidate(this.userData, project.id)
    .subscribe(
      response => {
        this.candidates = response;
        this.filteredCandidates = this.candidateControl.valueChanges.pipe(
          startWith(''),
          map(value => this._candidatesFilter(value)),
        );
      }
    );
  }

  getCandidateFiles(candidate: Candidate) {
    this.fileViewerService.getCandidateFile(candidate)
    .subscribe(
      response => {
        this.candidateFiles = response;
        this.newFile.candidateId = candidate.id;
      }
    );
  }

  imageSelected(e: any) {
    this.currentFile = e.files[0];
    this.newFile.fileName = this.currentFile!.name;
  }

  generateImage(){
    var node = document.getElementById('image-section');
    if(node != null)
    {
      node.innerHTML = ``;
      htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
  }

  oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '125750060163-qis3ua25s02dsro5t7ojfe9eu56km6p0.apps.googleusercontent.com',
                  'redirect_uri': 'https://localhost:4200/file-viewer',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', (params as any)[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
}
