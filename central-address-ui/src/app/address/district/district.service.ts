import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { District } from '../../models/district.model';

@Injectable({ providedIn: 'root' })
export class DistrictService {
  private apiUrl = 'https://localhost:7181/api/district';

  constructor(private http: HttpClient) {}

  getAll(): Observable<District[]> {
    return this.http.get<District[]>(this.apiUrl);
  }

  create(data: { districtName: string; provinceId: string }): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

  update(
    id: string,
    data: { districtName: string; provinceId: string }
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
