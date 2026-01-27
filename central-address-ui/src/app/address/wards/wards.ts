import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wards.html'
})
export class WardComponent implements OnInit {
  apiUrl = 'https://localhost:7181/api/ward';

  wards: any[] = [];
  municipalities: any[] = [];

  wardName = '';
  municipalityId = '';
  editingId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWards();
    this.loadMunicipalities();
  }

  loadWards() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.wards = res;
    });
  }

  loadMunicipalities() {
    this.http
      .get<any[]>('https://localhost:7181/api/municipality')
      .subscribe(res => {
        this.municipalities = res;
      });
  }

  /** 🔑 KEY FUNCTION */
  getMunicipalityName(id: string): string {
    const m = this.municipalities.find(x => x.id === id);
    return m ? m.municipalityName : '';
  }

  save() {
    const payload = {
      id: this.editingId ?? '00000000-0000-0000-0000-000000000000',
      wardName: this.wardName,
      municipalityId: this.municipalityId
    };

    if (this.editingId) {
      this.http
        .put(`${this.apiUrl}/${this.editingId}`, payload)
        .subscribe(() => {
          this.loadWards();
          this.reset();
        });
    } else {
      this.http.post(this.apiUrl, payload).subscribe(() => {
        this.loadWards();
        this.reset();
      });
    }
  }

  edit(w: any) {
    this.editingId = w.id;
    this.wardName = w.wardName;
    this.municipalityId = w.municipalityId;
  }

  delete(id: string) {
    if (!confirm('Delete this ward?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadWards();
    });
  }

  reset() {
    this.editingId = null;
    this.wardName = '';
    this.municipalityId = '';
  }
}
