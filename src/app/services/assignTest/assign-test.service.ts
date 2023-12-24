import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignTest } from 'src/app/models/AssignTest/assign-test';

@Injectable({
  providedIn: 'root'
})
export class AssignTestService {
  private apiUrl = 'http://localhost:8080/assign-tests';

  constructor(private http: HttpClient) { }

  getAllAssignTests(): Observable<AssignTest[]> {
    return this.http.get<AssignTest[]>(`${this.apiUrl}/all`);
  }

  addAssignTest(assignTest: AssignTest): Observable<AssignTest> {
    return this.http.post<AssignTest>(`${this.apiUrl}/add`, assignTest);
  }

  updateAssignTest(assignTestId: number, assignTest: AssignTest): Observable<AssignTest> {
    return this.http.put<AssignTest>(`${this.apiUrl}/update/${assignTestId}`, assignTest);
  }

  deleteAssignTest(assignTestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${assignTestId}`);
  }

  getAssignTestById(assignTestId: number): Observable<AssignTest> {
    return this.http.get<AssignTest>(`${this.apiUrl}/${assignTestId}`);
  }

  updateAttemptNumber(assignTestId: number, newAttemptNumber: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-attempt-number/${assignTestId}/${newAttemptNumber}`, {});
  }

  

}
