import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalAddress } from '../../models/localaddress.model';

@Injectable({ providedIn: 'root' })
export class LocalAddressService {
  private apiUrl = 'https://localhost:7181/api/localaddress';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LocalAddress[]> {
    return this.http.get<LocalAddress[]>(this.apiUrl);
  }

  getById(id: string): Observable<LocalAddress> {
    return this.http.get<LocalAddress>(`${this.apiUrl}/${id}`);
  }

  create(data: LocalAddress): Observable<LocalAddress> {
    return this.http.post<LocalAddress>(this.apiUrl, data);
  }

  update(id: string, data: LocalAddress): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
