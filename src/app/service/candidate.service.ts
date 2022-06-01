import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalParams } from '../models/additionalParams.model';
import { Candidate } from '../models/candidate.model';
import { Technology } from '../models/technology.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  baseUrl = 'https://localhost:7127/api/Canditate/';

  constructor(private http: HttpClient) { }

  getCandidates(technologyId: string): Observable<Candidate[]> {
    let params = new HttpParams()
      .set("technologyId", technologyId!);
    return this.http.get<Candidate[]>(this.baseUrl + "GetCandidateByTechnology", { params : params })
  }

  getCandidateById(candidateId: string): Observable<Candidate> {
    let params = new HttpParams()
      .set("candidateId", candidateId!);
    return this.http.get<Candidate>(this.baseUrl + "GetCandidateById", { params : params })
  }

  UpdateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(this.baseUrl + "UpdateCandidate", candidate)
  }

  getAdditionalParams(candidateId: string): Observable<AdditionalParams[]>{
    let params = new HttpParams()
      .set("candidateId", candidateId!);
    return this.http.get<AdditionalParams[]>(this.baseUrl + "GetAdditionalParams", { params : params })
  }

  updateAdditionalParams(additionalParams: AdditionalParams[]): Observable<any> {
    return this.http.put<any>(this.baseUrl + "UpdateAdditionalParams", additionalParams)
  }

  deleteAdditionalParams(additionalParams: AdditionalParams[]): Observable<any> {
    return this.http.put<any>(this.baseUrl + "DeleteAdditionalParams", additionalParams)
  }

  getTechnologyCandidate(candidateId: string): Observable<Technology[]>{
    let params = new HttpParams()
      .set("candidateId", candidateId!);
    return this.http.get<Technology[]>(this.baseUrl + "GetTechnologyCandidate", { params : params })
  }

  getAbleTechnology(candidateId: string, projectId: string): Observable<Technology[]>{
    let params = new HttpParams()
      .set("candidateId", candidateId!)
      .set("projectId", projectId!);
    return this.http.get<Technology[]>(this.baseUrl + "GetAbleTechnology", { params : params })
  }

  updateCandidateTechnologyList(technologyId: string, candidateId: string, technology: Technology[]): Observable<any> {
    return this.http.put<any>(this.baseUrl + "UpdateCandidateTechnologyList/"+ technologyId + '/' + candidateId, technology)
  }

  createCandidate(addCandidate: any): Observable<any> {
    var candidate = {
      li_at: addCandidate.li_at,
      linkedIn: addCandidate.linkedIn,
      technologyId: addCandidate.technologyId
    }
    console.log(candidate)
    return this.http.post<any>(this.baseUrl + 'Index', candidate)
  }
}
