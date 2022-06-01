import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { CandidateFile } from '../models/candidateFile.model';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FileViewerService {

  accountName = 'diplom';
  containerName = 'pictures';

  baseUrl = "https://localhost:7127/api/CandidateFile/";

  constructor(private http: HttpClient) { }

  getProjects(user: User): Observable<Project[]> {
    let params = new HttpParams()
      .set("userId", user.sub!);
    return this.http.get<Project[]>(this.baseUrl + 'getProjects', {params: params});
  }

  getProjectsCandidate(user: User, projectId: string): Observable<Candidate[]> {
    let params = new HttpParams()
      .set("userId", user.sub!)
      .set("projectId", projectId!);
    return this.http.get<Candidate[]>(this.baseUrl + 'getProjectsCandidate', {params: params});
  }

  getCandidateFile(candidate: Candidate): Observable<CandidateFile[]> {
    let params = new HttpParams()
      .set("candidateID", candidate.id!);
    return this.http.get<CandidateFile[]>(this.baseUrl + 'getCandidateFile', {params: params});
  }

  postEmptyFile(candidateId: string, file: CandidateFile): Observable<CandidateFile> {
    return this.http.post<CandidateFile>(this.baseUrl + 'PostEmptyFile/' + candidateId, file);
  }

  putCandidateFile(candidateId: string, file: CandidateFile): Observable<CandidateFile[]> {
    return this.http.put<CandidateFile[]>(this.baseUrl + 'PutCandidateFile/' + candidateId, file);
  }

  deleteCandidateFile(candidateId: string, fileId: string): Observable<CandidateFile[]> {
    let params = new HttpParams()
    .set("candidateId", candidateId!)
    .set("fileId", fileId!);
    return this.http.delete<any>(this.baseUrl + 'DeleteCandidateFile', {params: params});
  }

  public uploadImage(sas: string, content: Blob, name: string, handler: () => void) {
    this.uploadBlob(content, name, this.containerClient(sas), handler)
  }

  private uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
    let blockBlobClient = client.getBlockBlobClient(name);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
  }

  private containerClient(sas: string): ContainerClient {
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${sas}`)
            .getContainerClient(this.containerName);
  }

  public deleteImage(sas: string, name: string, handler: () => void) {
    this.deleteBlob(name, this.containerClient(sas), handler)
  }

  private deleteBlob(name: string, client: ContainerClient, handler: () => void) {
    client.deleteBlob(name).then(() => {
      handler()
    })
  }
}
