import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8080/subjects';
  constructor(private Http:HttpClient) {}
  getAllSubjects(): Observable<Subject[]> {
    return this.Http.get<Subject[]>(`${this.apiUrl}/all`);
  }
  addSubject(subject: Subject): Observable<Subject> {
    return this.Http.post<Subject>(`${this.apiUrl}/add`, subject);
  }
  updateSubject(id: number, subject: Subject): Observable<Subject> {
    return this.Http.put<Subject>(`${this.apiUrl}/${id}`, subject);
  }
  deleteSubject(id: number): Observable<void> {
    return this.Http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
