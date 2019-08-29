import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../constants';
import {Subject} from '../model/Subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  list(year, idDC ): Observable<Subject[]> {
    const subjectUrl = `${URL.SUBJECTS}/${year}/${idDC}`;

    return this.http.get<Subject[]>(subjectUrl);


  }


  listHome(): Observable<Subject[]> {
    const subjectUrl = `${URL.HOME}`;
    return this.http.get<Subject[]>(subjectUrl);
}

  listFavourite(): Observable<Subject[]>{
    const favouriteUrl = `${URL.FAVOURITE}`;
    return this.http.get<Subject[]>(favouriteUrl);
  }
}