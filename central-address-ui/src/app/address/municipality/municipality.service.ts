import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipality } from '../../models/municipality.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
  private apiUrl = 'https://localhost:7181/api/Municipality';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(this.apiUrl);
  }

  getById(id: string): Observable<Municipality> {
    return this.http.get<Municipality>(`${this.apiUrl}/${id}`);
  }

  create(data: Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(this.apiUrl, data);
  }

  update(id: string, data: Municipality): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
