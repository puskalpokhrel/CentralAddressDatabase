import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DistrictService } from './district.service';
import { ProvinceService } from '../province/province.service';

import { District } from '../../models/district.model';
import { Province } from '../../models/province.model';

@Component({
  standalone: true,
  selector: 'app-district',
  imports: [CommonModule, FormsModule],
  templateUrl: './district.html'
})
export class DistrictComponent implements OnInit {

  districts: District[] = [];
  provinces: Province[] = [];

  districtName = '';
  provinceId = '';
  editingId: string | null = null;

  constructor(
    private districtService: DistrictService,
    private provinceService: ProvinceService
  ) {}

  ngOnInit(): void {
    this.loadDistricts();
    this.loadProvinces();
  }

  loadDistricts(): void {
    this.districtService.getAll().subscribe({
      next: data => (this.districts = data),
      error: err => console.error(err)
    });
  }

  loadProvinces(): void {
    this.provinceService.getAll().subscribe({
      next: data => (this.provinces = data),
      error: err => console.error(err)
    });
  }

  save(): void {
    if (!this.districtName.trim() || !this.provinceId) return;

    const payload = {
      districtName: this.districtName,
      provinceId: this.provinceId
    };

    if (this.editingId) {
      this.districtService.update(this.editingId, payload).subscribe(() => {
        this.reset();
        this.loadDistricts();
      });
    } else {
      this.districtService.create(payload).subscribe(() => {
        this.reset();
        this.loadDistricts();
      });
    }
  }

  edit(d: District): void {
    this.editingId = d.id;
    this.districtName = d.districtName;
    this.provinceId = d.provinceId;
  }

  delete(id: string): void {
    if (!confirm('Delete this district?')) return;

    this.districtService.delete(id).subscribe(() => {
      this.loadDistricts();
    });
  }

  getProvinceName(id: string): string {
    const province = this.provinces.find(p => p.id === id);
    return province ? province.provinceName : '';
  }

  reset(): void {
    this.districtName = '';
    this.provinceId = '';
    this.editingId = null;
  }
}
