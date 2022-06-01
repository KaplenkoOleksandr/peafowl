import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class ProjectUserService {
  baseUrl = "https://localhost:7127/api/project/";

  constructor(private http: HttpClient) { }

  // get all the projects of current user
  getProjectsCurrentUser(user: User): Observable<Project[]> {
    let params = new HttpParams()
      .set("userId", user.sub!)
      .set("userEmail", user.emails!)
      .set("name", user.given_name!)
      .set("surname", user.family_name!);
    return this.http.get<Project[]>(this.baseUrl + 'GetAllUserProjects', {params: params});
  }

    // get project of current user
    getProject(user: User, projectId: string): Observable<Project> {
      let params = new HttpParams()
        .set("userId", user.sub!)
        .set("userEmail", user.emails!)
        .set("projectId", projectId!);
      return this.http.get<Project>(this.baseUrl + 'GetUserProject', {params: params});
    }

    getFiel(){
      let headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ya29.A0ARrdaM8D6Ph_pOhWiacBX9BsTmMK78h3QeoeGWwPNyWjUYKfcZLVk83nlVTWDQyA1_DV31Q8f8itMcFoapqf5S0xtyrUNLoP976k3bvVWmhig3gjlwSNbQvFfqMRfVm5APnwOdtsCSl2Eh_EcKcrJDQwGfRd');
      headers.append('Accept', 'application/json');
      headers.append('alt', 'media');
      return this.http.get('https://www.googleapis.com/drive/v3/files/10TKJnD_FyozokTFsftqW7gbDSkVGV0eE?key=AIzaSyAv7OHJCsEUgIuCNK8LeJNVYceGmmXTOvI', { headers: headers });
    }

    createProject(user:User, project: Project): Observable<Project> {
      return this.http.post<Project>(this.baseUrl + 'Create/' + user.emails, project)
    }
}
