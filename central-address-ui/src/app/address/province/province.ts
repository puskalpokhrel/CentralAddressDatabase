import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProvinceService } from './province.service';
import { Province, CreateProvince } from '../../models/province.model';

@Component({
  selector: 'app-province',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './province.html',
  styleUrl: './province.css'
})
export class ProvinceComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(ProvinceService);

  provinces: Province[] = [];

  provinceForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.maxLength(3)]]
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: (res: Province[]) => this.provinces = res,
      error: err => console.error(err)
    });
  }

  submit(): void {
    if (this.provinceForm.invalid) return;

    const payload: CreateProvince = this.provinceForm.getRawValue();

    this.service.create(payload).subscribe({
      next: () => {
        this.provinceForm.reset();
        this.load();
      },
      error: err => console.error(err)
    });
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(() => this.load());
  }
}
