import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProvinceService } from './province.service';
import { Province } from '../../models/province.model';

@Component({
  standalone: true,
  selector: 'app-province',
  imports: [CommonModule, FormsModule],
  templateUrl: './province.html'
})
export class ProvinceComponent implements OnInit {

  provinces: Province[] = [];
  provinceName: string = '';
  editingId: string | null = null;

  constructor(private provinceService: ProvinceService) {}

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces(): void {
    this.provinceService.getAll().subscribe({
      next: (data) => {
        this.provinces = data;
      },
      error: (err) => {
        console.error('Failed to load provinces', err);
      }
    });
  }

  save(): void {
    if (!this.provinceName.trim()) {
      return;
    }

    if (this.editingId) {
      this.provinceService
        .update(this.editingId, { provinceName: this.provinceName })
        .subscribe(() => {
          this.resetForm();
          this.loadProvinces();
        });
    } else {
      this.provinceService
        .create({ provinceName: this.provinceName })
        .subscribe(() => {
          this.resetForm();
          this.loadProvinces();
        });
    }
  }

  edit(province: Province): void {
    this.editingId = province.id;
    this.provinceName = province.provinceName;
  }

  delete(id: string): void {
    if (!confirm('Delete this province?')) {
      return;
    }

    this.provinceService.delete(id).subscribe(() => {
      this.loadProvinces();
    });
  }

  resetForm(): void {
    this.provinceName = '';
    this.editingId = null;
  }
}
