import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocalAddressService {
  private http = inject(HttpClient);
  private api = 'https://localhost:7181/api/LocalAddress';

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
