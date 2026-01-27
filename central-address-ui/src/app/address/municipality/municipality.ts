import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Municipality {
  id: string;
  municipalityName: string;
  municipalityType: string;
  districtId: string;
}

interface District {
  id: string;
  districtName: string;
  provinceId: string;
}

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipality.html'
})
export class MunicipalityComponent implements OnInit {

  // API URLs (port 7181)
  private municipalityUrl = 'https://localhost:7181/api/municipality';
  private districtUrl = 'https://localhost:7181/api/district';

  municipalities: Municipality[] = [];
  districts: District[] = [];

  // form fields
  municipalityName = '';
  municipalityType = '';
  districtId = '';

  editingId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDistricts();
    this.loadMunicipalities();
  }

  // ---------------- LOAD DATA ----------------

  loadMunicipalities() {
    this.http.get<Municipality[]>(this.municipalityUrl)
      .subscribe(res => this.municipalities = res);
  }

  loadDistricts() {
    this.http.get<District[]>(this.districtUrl)
      .subscribe(res => this.districts = res);
  }

  // ---------------- DISPLAY HELPERS ----------------

  getDistrictName(districtId: string): string {
    const district = this.districts.find(d => d.id === districtId);
    return district ? district.districtName : '';
  }

  // ---------------- CRUD ----------------

  save() {
    const payload = {
      municipalityName: this.municipalityName,
      municipalityType: this.municipalityType,
      districtId: this.districtId
    };

    if (this.editingId) {
      this.http.put(
        `${this.municipalityUrl}/${this.editingId}`,
        payload
      ).subscribe(() => {
        this.resetForm();
        this.loadMunicipalities();
      });
    } else {
      this.http.post(this.municipalityUrl, payload)
        .subscribe(() => {
          this.resetForm();
          this.loadMunicipalities();
        });
    }
  }

  edit(m: Municipality) {
    this.editingId = m.id;
    this.municipalityName = m.municipalityName;
    this.municipalityType = m.municipalityType;
    this.districtId = m.districtId;
  }

  delete(id: string) {
    if (!confirm('Delete this municipality?')) return;

    this.http.delete(`${this.municipalityUrl}/${id}`)
      .subscribe(() => this.loadMunicipalities());
  }

  resetForm() {
    this.editingId = null;
    this.municipalityName = '';
    this.municipalityType = '';
    this.districtId = '';
  }
}
