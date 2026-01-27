import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from '../../models/province.model';

@Injectable({ providedIn: 'root' })
export class ProvinceService {
  private apiUrl = 'https://localhost:7181/api/province';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiUrl);
  }

  create(data: { provinceName: string }): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

  update(id: string, data: { provinceName: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
