import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Skills } from '../model/skills.model';
import { Associate } from '../model/associate.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AssociateService {

  headers: Headers;
  options: RequestOptions;

  constructor(
    private http: Http,
    private httpClient: HttpClient) {
    this.headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json, */*'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  addAssociate(file: File, data: Associate): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('data', JSON.stringify(data));
    const req = new HttpRequest('POST', 'http://localhost:8090/skilltracker/addassociate', formdata, {
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

  viewAllAssociates(): Observable<any> {
    return this.http.get('http://localhost:8090/skilltracker/viewallassociates', this.options)
      .map(this.extractData)
      .do(data => console.log("get Countries from json: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteAssociate(param: string): Observable<any> {
    return this.http.delete('http://localhost:8090/skilltracker/deleteassociate/' + param, this.options)
      .map(this.extractData)
      .do(data => console.log("get categories from json: " + JSON.stringify(data)))
      .catch(this.handleError);
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