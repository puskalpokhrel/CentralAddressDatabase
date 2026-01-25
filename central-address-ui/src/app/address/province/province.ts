import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProvinceService } from './province.service';

@Component({
  selector: 'app-province',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './province.html',
  styleUrl: './province.css'
})
export class ProvinceComponent {

  private fb = inject(FormBuilder);
  private service = inject(ProvinceService);

  provinceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.maxLength(3)]]
  });

  loading = false;
  message = '';

  submit() {
    if (this.provinceForm.invalid) return;

    this.loading = true;
    this.message = '';

    this.service.create(this.provinceForm.value).subscribe({
      next: () => {
        this.message = 'Province saved successfully ✅';
        this.provinceForm.reset();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.message = 'Failed to save province ❌';
        this.loading = false;
      }
    });
  }
}
