import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { District } from '../../models/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private apiUrl = 'https://localhost:5001/api/district';

  constructor(private http: HttpClient) {}

  // GET: api/district
  getAll(): Observable<District[]> {
    return this.http.get<District[]>(this.apiUrl);
  }

  // GET: api/district/{id}
  getById(id: string): Observable<District> {
    return this.http.get<District>(`${this.apiUrl}/${id}`);
  }

  // GET: api/district/by-province/{provinceId}
  getByProvince(provinceId: string): Observable<District[]> {
    return this.http.get<District[]>(
      `${this.apiUrl}/by-province/${provinceId}`
    );
  }

  // POST: api/district
  create(data: Partial<District>): Observable<District> {
    return this.http.post<District>(this.apiUrl, data);
  }

  // DELETE: api/district/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
