import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MySchedule } from '../models/mySchedule.model';
import { Project } from '../models/project.model';
import { ProjectWithSchedule } from '../models/projectWithSchedule.model';
import { UserWithSchedule } from '../models/userWithSchedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseUrl = "https://localhost:7127/api/Schedule/";

  constructor(private http: HttpClient) { }

  getProject(userId: string): Observable<ProjectWithSchedule[]> {
    let params = new HttpParams()
      .set("userId", userId!);
    return this.http.get<ProjectWithSchedule[]>(this.baseUrl + 'GetProjects', { params: params })
  }

  getUser(userId: string): Observable<UserWithSchedule> {
    let params = new HttpParams()
      .set("userId", userId!);
    return this.http.get<UserWithSchedule>(this.baseUrl + 'GetUser', { params: params })
  }

  putSchedule(scheduler: MySchedule): Observable<MySchedule> {
    return this.http.put<MySchedule>(this.baseUrl + 'PutSchedule', scheduler)
  }
}
