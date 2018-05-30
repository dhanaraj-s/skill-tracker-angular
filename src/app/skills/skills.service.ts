import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Skills } from '../model/skills.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SkillsService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 
                                   'Accept': 'application/json, */*' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  viewAllSkills (): Observable<any> {
    return this.http.get('http://localhost:8090/skilltracker/viewallskills', this.options)
                    .map(this.extractData)
                    .do(data => console.log("get Countries from json: " + JSON.stringify(data)))
                    .catch(this.handleError);
  }

  deleteSkill (param: string): Observable<any> {
    return this.http.delete('http://localhost:8090/skilltracker/deleteskill/'+param, this.options)
                    .map(this.extractData)
                    .do(data => console.log("get categories from json: " + JSON.stringify(data)))
                    .catch(this.handleError);
  }

  editSkill (param: any): Observable<Skills[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/skilltracker/editskill', body, this.options)
                    .map(this.extractData)
                    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  addSkill (param: any): Observable<Skills[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/skilltracker/addskill', body, this.options)
                    .map(this.extractData)
                    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || "500 internal server error");
  }

}