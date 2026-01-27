import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localaddress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './localaddress.html'
})
export class LocalAddressComponent implements OnInit {
  apiUrl = 'https://localhost:7181/api/localaddress';

  localAddresses: any[] = [];
  wards: any[] = [];

  houseNumber = '';
  streetName = '';
  areaName = '';
  postalCode = '';
  wardId = '';

  editingId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLocalAddresses();
    this.loadWards();
  }

  loadLocalAddresses() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.localAddresses = res;
    });
  }

  loadWards() {
    this.http
      .get<any[]>('https://localhost:7181/api/ward')
      .subscribe(res => {
        this.wards = res;
      });
  }

  /** 🔑 MAP wardId → wardName */
  getWardName(id: string): string {
    const w = this.wards.find(x => x.id === id);
    return w ? w.wardName : '';
  }

  save() {
    const payload = {
      id: this.editingId ?? '00000000-0000-0000-0000-000000000000',
      houseNumber: this.houseNumber,
      streetName: this.streetName,
      areaName: this.areaName,
      postalCode: this.postalCode,
      wardId: this.wardId
    };

    if (this.editingId) {
      this.http
        .put(`${this.apiUrl}/${this.editingId}`, payload)
        .subscribe(() => {
          this.loadLocalAddresses();
          this.reset();
        });
    } else {
      this.http.post(this.apiUrl, payload).subscribe(() => {
        this.loadLocalAddresses();
        this.reset();
      });
    }
  }

  edit(a: any) {
    this.editingId = a.id;
    this.houseNumber = a.houseNumber;
    this.streetName = a.streetName;
    this.areaName = a.areaName;
    this.postalCode = a.postalCode;
    this.wardId = a.wardId;
  }

  delete(id: string) {
    if (!confirm('Delete this address?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadLocalAddresses();
    });
  }

  reset() {
    this.editingId = null;
    this.houseNumber = '';
    this.streetName = '';
    this.areaName = '';
    this.postalCode = '';
    this.wardId = '';
  }
}
