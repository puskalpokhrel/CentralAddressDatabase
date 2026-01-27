import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ward {
  id: string;
  wardNumber: number;
  municipalityId: string;
}

@Injectable({
  providedIn: 'root'
})
export class WardsService {

  private baseUrl = 'https://localhost:7181/api/ward';

  constructor(private http: HttpClient) {}

  // ---------------- GET ALL ----------------
  getAll(): Observable<Ward[]> {
    return this.http.get<Ward[]>(this.baseUrl);
  }

  // ---------------- GET BY ID ----------------
  getById(id: string): Observable<Ward> {
    return this.http.get<Ward>(`${this.baseUrl}/${id}`);
  }

  // ---------------- CREATE ----------------
  create(payload: {
    wardNumber: number;
    municipalityId: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  // ---------------- UPDATE ----------------
  update(
    id: string,
    payload: {
      wardNumber: number;
      municipalityId: string;
    }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  // ---------------- DELETE ----------------
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
