import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestQuestion } from 'src/app/models/TestQuestion/test-question';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {
  private apiUrl = 'http://localhost:8080/testquestions';

  constructor(private http: HttpClient) { }

  getAllTestQuestions(): Observable<TestQuestion[]> {
    return this.http.get<TestQuestion[]>(`${this.apiUrl}/all`);
  }

  addTestQuestion(testQuestion: TestQuestion): Observable<TestQuestion> {
    return this.http.post<TestQuestion>(`${this.apiUrl}/add`, testQuestion);
  }

  getTestQuestionById(testId: number, questionId: number): Observable<TestQuestion> {
    return this.http.get<TestQuestion>(`${this.apiUrl}/${testId}/${questionId}`);
  }
  getTestQuestionsByTestId(testId: number): Observable<TestQuestion[]> {
    return this.http.get<TestQuestion[]>(`${this.apiUrl}/by-test/${testId}`);
  }

}
