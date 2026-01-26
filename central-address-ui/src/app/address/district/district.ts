import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { DistrictService } from './district.service';
import { ProvinceService } from '../province/province.service';

import { District, CreateDistrict } from '../../models/district.model';
import { Province } from '../../models/province.model';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './district.html'
})
export class DistrictComponent implements OnInit {

  private fb = inject(FormBuilder);
  private districtService = inject(DistrictService);
  private provinceService = inject(ProvinceService);

  districts: District[] = [];
  provinces: Province[] = [];

  districtForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.maxLength(4)]],
    provinceId: ['', Validators.required]
  });

  ngOnInit(): void {
    this.load();
    this.loadProvinces();
  }

  load(): void {
    this.districtService.getAll().subscribe({
      next: res => this.districts = res,
      error: err => console.error(err)
    });
  }

  loadProvinces(): void {
    this.provinceService.getAll().subscribe({
      next: res => this.provinces = res,
      error: err => console.error(err)
    });
  }

  submit(): void {
    if (this.districtForm.invalid) return;

    const payload: CreateDistrict = this.districtForm.getRawValue();

    this.districtService.create(payload).subscribe({
      next: () => {
        this.districtForm.reset();
        this.load();
      },
      error: err => console.error(err)
    });
  }

  delete(id: string): void {
    this.districtService.delete(id).subscribe(() => this.load());
  }
}
