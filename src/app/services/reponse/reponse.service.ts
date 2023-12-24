import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponse } from 'src/app/models/reponse/reponse';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:8080/reponses';

  constructor(private http : HttpClient) { }

  getAllReponses(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.apiUrl}/all`);
  }

  addReponse(reponse: Reponse): Observable<Reponse> {
    return this.http.post<Reponse>(`${this.apiUrl}/add`, reponse);
  }

  getReponseById(reponseId: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.apiUrl}/${reponseId}`);
  }

  deleteAllResponses(assignTestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-all/${assignTestId}`);
  }

}
