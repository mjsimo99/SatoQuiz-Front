import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../../models/answer/answer';







@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private apiUrl = 'http://localhost:8080/answers';

  constructor(private http: HttpClient) {}

  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/all`);
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.apiUrl}/add`, answer);
  }

  updateAnswer(answerId: number, answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.apiUrl}/update/${answerId}`, answer);
  }

  deleteAnswer(answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${answerId}`);
  }
}
