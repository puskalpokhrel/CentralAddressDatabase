import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './municipality.html',
  styleUrl: './municipality.css'
})
export class MunicipalityComponent {

  private fb = inject(FormBuilder);

  municipalityForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', Validators.required],
    districtId: ['', Validators.required],
    code: ['', [Validators.required, Validators.maxLength(5)]]
  });

  submit() {
    if (this.municipalityForm.valid) {
      console.log('Municipality Saved:', this.municipalityForm.value);
      this.municipalityForm.reset();
    }
  }
}
