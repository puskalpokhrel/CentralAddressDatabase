import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalAddress, CreateLocalAddress } from '../../models/localaddress.model';

@Injectable({
  providedIn: 'root'
})
export class LocalAddressService {

  private apiUrl = 'https://localhost:5001/api/localaddress';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LocalAddress[]> {
    return this.http.get<LocalAddress[]>(this.apiUrl);
  }

  create(data: CreateLocalAddress): Observable<LocalAddress> {
    return this.http.post<LocalAddress>(this.apiUrl, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
