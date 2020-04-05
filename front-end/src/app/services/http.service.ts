import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from './../model/group';
import { Schools } from './../model/schools';


const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  readonly url = 'http://localhost:3000/schools';
  readonly url2 = 'http://localhost:3000/group';


  getSchools(): Observable<Schools[]> {
    return this.http.get<Schools[]>(this.url);
  }

  createSchools(schools: Schools): Observable<Schools> {
    return this.http.post<Schools>(this.url, schools, httpOptions);
  }
  updateSchools(id: string, schools: Schools): Observable<Schools> {
    const apiurl = `${this.url}/${id}`;
    return this.http.put<Schools>(apiurl, schools , httpOptions);
  }
  deleteSchoolsId(id: string): Observable<Schools> {
    const apiurl = `${this.url}/${id}`;
    return this.http.delete<any>(apiurl, httpOptions);
  }




  getGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url2);
  }
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.url2, group, httpOptions);
  }
  updateGroup(id: string, group: Group): Observable<Group> {
    const apiurl = `${this.url2}/${id}`;
    return this.http.put<Group>(apiurl, group , httpOptions);
  }
  deleteGroupId(id: string): Observable<Group> {
    const apiurl = `${this.url2}/${id}`;
    return this.http.delete<any>(apiurl, httpOptions);
  }

}
