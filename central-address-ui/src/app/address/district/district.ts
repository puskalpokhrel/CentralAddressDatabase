import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './district.html',
  styleUrl: './district.css'
})
export class DistrictComponent {

  private fb = inject(FormBuilder);

  districtForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    provinceId: ['', Validators.required],
    code: ['', [Validators.required, Validators.maxLength(4)]]
  });

  submit() {
    if (this.districtForm.valid) {
      console.log('District Saved:', this.districtForm.value);
      this.districtForm.reset();
    }
  }
}
