import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { WardService } from './wards.service';
import { MunicipalityService } from '../municipality/municipality.service';

import { Ward, CreateWard } from '../../models/ward.model';
import { Municipality } from '../../models/municipality.model';

@Component({
  selector: 'app-wards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wards.html'
})
export class WardsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private wardService = inject(WardService);
  private municipalityService = inject(MunicipalityService);

  wards: Ward[] = [];
  municipalities: Municipality[] = [];

  wardForm = this.fb.nonNullable.group({
    wardNumber: [0, Validators.required],
    municipalityId: ['', Validators.required],
    population: [0]
  });

  ngOnInit(): void {
    this.load();
    this.loadMunicipalities();
  }

  load(): void {
    this.wardService.getAll().subscribe({
      next: res => this.wards = res,
      error: err => console.error(err)
    });
  }

  loadMunicipalities(): void {
    this.municipalityService.getAll().subscribe({
      next: res => this.municipalities = res,
      error: err => console.error(err)
    });
  }

  submit(): void {
    if (this.wardForm.invalid) return;

    const payload: CreateWard = this.wardForm.getRawValue();

    this.wardService.create(payload).subscribe({
      next: () => {
        this.wardForm.reset();
        this.load();
      },
      error: err => console.error(err)
    });
  }

  delete(id: string): void {
    this.wardService.delete(id).subscribe(() => this.load());
  }
}
