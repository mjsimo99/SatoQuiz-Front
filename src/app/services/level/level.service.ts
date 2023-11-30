import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '../../models/level.model';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private apiUrl = 'http://localhost:8080/levels';
  levelsChanged: EventEmitter<number> = new EventEmitter<number>();


  constructor(private http: HttpClient) {}

  getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.apiUrl}/all`);
  }
  addLevel(level: Level): Observable<Level> {
    return this.http.post<Level>(`${this.apiUrl}/add`, level);
  }
  
  updateLevel(id: number, level: Level): Observable<Level> {
    return this.http.put<Level>(`${this.apiUrl}/update/${id}`, level);
  }
  
  deleteLevel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}