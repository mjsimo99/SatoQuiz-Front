import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'src/app/models/test/test';



@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests/all`);
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/tests/${id}`);
  }

  addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests/add`, test);
  }

  updateTest(id: number, test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiUrl}/tests/update/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tests/${id}`);
  }

}
