import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province, CreateProvince } from '../../models/province.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private apiUrl = 'https://localhost:5001/api/province'; 
  // 🔁 change port if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiUrl);
  }

  getById(id: string): Observable<Province> {
    return this.http.get<Province>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateProvince): Observable<Province> {
    return this.http.post<Province>(this.apiUrl, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
