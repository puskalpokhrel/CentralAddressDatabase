import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ward } from '../../models/ward.model';

@Injectable({
  providedIn: 'root'
})
export class WardService {

  private apiUrl = 'https://localhost:5001/api/ward';

  constructor(private http: HttpClient) {}

  // GET: api/ward
  getAll(): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.apiUrl);
  }

  // GET: api/ward/{id}
  getById(id: string): Observable<Ward> {
    return this.http.get<Ward>(`${this.apiUrl}/${id}`);
  }

  // GET: api/ward/by-municipality/{municipalityId}
  getByMunicipality(municipalityId: string): Observable<Ward[]> {
    return this.http.get<Ward[]>(
      `${this.apiUrl}/by-municipality/${municipalityId}`
    );
  }

  // POST: api/ward
  create(data: Partial<Ward>): Observable<Ward> {
    return this.http.post<Ward>(this.apiUrl, data);
  }

  // DELETE: api/ward/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
