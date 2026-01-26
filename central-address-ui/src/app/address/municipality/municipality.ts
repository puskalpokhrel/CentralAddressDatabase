import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MunicipalityService } from './municipality.service';
import { DistrictService } from '../district/district.service';

import { Municipality, CreateMunicipality } from '../../models/municipality.model';
import { District } from '../../models/district.model';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './municipality.html'
})
export class MunicipalityComponent implements OnInit {

  private fb = inject(FormBuilder);
  private municipalityService = inject(MunicipalityService);
  private districtService = inject(DistrictService);

  municipalities: Municipality[] = [];
  districts: District[] = [];

  municipalityForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', Validators.required],
    code: ['', [Validators.required, Validators.maxLength(4)]],
    districtId: ['', Validators.required]
  });

  ngOnInit(): void {
    this.load();
    this.loadDistricts();
  }

  load(): void {
    this.municipalityService.getAll().subscribe({
      next: res => this.municipalities = res,
      error: err => console.error(err)
    });
  }

  loadDistricts(): void {
    this.districtService.getAll().subscribe({
      next: res => this.districts = res,
      error: err => console.error(err)
    });
  }

  submit(): void {
    if (this.municipalityForm.invalid) return;

    const payload: CreateMunicipality = this.municipalityForm.getRawValue();

    this.municipalityService.create(payload).subscribe({
      next: () => {
        this.municipalityForm.reset();
        this.load();
      },
      error: err => console.error(err)
    });
  }

  delete(id: string): void {
    this.municipalityService.delete(id).subscribe(() => this.load());
  }
}
