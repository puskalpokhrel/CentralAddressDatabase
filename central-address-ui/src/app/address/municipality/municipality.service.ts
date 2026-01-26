import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipality } from '../../models/municipality.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private apiUrl = 'https://localhost:5001/api/municipality';

  constructor(private http: HttpClient) {}

  // GET: api/municipality
  getAll(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(this.apiUrl);
  }

  // GET: api/municipality/{id}
  getById(id: string): Observable<Municipality> {
    return this.http.get<Municipality>(`${this.apiUrl}/${id}`);
  }

  // GET: api/municipality/by-district/{districtId}
  getByDistrict(districtId: string): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(
      `${this.apiUrl}/by-district/${districtId}`
    );
  }

  // POST: api/municipality
  create(data: Partial<Municipality>): Observable<Municipality> {
    return this.http.post<Municipality>(this.apiUrl, data);
  }

  // DELETE: api/municipality/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
