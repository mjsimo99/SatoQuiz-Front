import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Validation } from 'src/app/models/validation/validation';

@Injectable({
  providedIn: 'root',
})



export class ValidationService {
  private apiUrl = 'http://localhost:8080/validations';

  constructor(private http: HttpClient) { }

  getAllValidations(): Observable<Validation[]> {
    return this.http.get<Validation[]>(`${this.apiUrl}/all`);
  }

  addValidation(validation: Validation): Observable<Validation> {
    return this.http.post<Validation>(`${this.apiUrl}/add`, validation);
  }

  getValidationByIds(questionId: number, answerId: number): Observable<Validation> {
    return this.http.get<Validation>(`${this.apiUrl}/${questionId}/${answerId}`);
  }


  updateValidation(questionId: number, answerId: number, validation: Validation): Observable<Validation> {
    return this.http.put<Validation>(`${this.apiUrl}/update/${questionId}/${answerId}`, validation);
  }


  deleteValidation(questionId: number, answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${questionId}/${answerId}`);
  }
}

