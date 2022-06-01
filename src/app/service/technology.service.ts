import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectUserComponent } from '../components/project-user/project-user.component';
import { Technology } from '../models/technology.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  baseUrl = "https://localhost:7127/api/Technology/";

  constructor(private http: HttpClient) { }

  getAllTechnology(user: User, projectId: string): Observable<Technology[]>{
    let params = new HttpParams()
      .set("userId", user.sub!)
      .set("email", user.emails!)
      .set("projId", projectId!);
    return this.http.get<Technology[]>(this.baseUrl + "Get", { params: params });
  }

  addTechnology(technology: Technology): Observable<Technology>{
    technology.id = "0";
    return this.http.post<Technology>(this.baseUrl + "Post", technology)
  }
}
